import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAlmacenVistas360 } from './vistas360';

describe('useAlmacenVistas360', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Estado inicial', () => {
    it('deberia inicializar vistas con datos mapeados desde vistas360.json5', () => {
      const store = useAlmacenVistas360();
      expect(store.vistas.length).toBeGreaterThan(0);
      expect(store.vistas[0]).toHaveProperty('id');
      expect(store.vistas[0]).toHaveProperty('categoria');
      expect(store.vistas[0]).toHaveProperty('modelo');
      expect(store.vistas[0]).toHaveProperty('tarjeta');
      expect(store.vistas[0]).toHaveProperty('escenas');
    });

    it('deberia inicializar vistaActual como null', () => {
      const store = useAlmacenVistas360();
      expect(store.vistaActual).toBeNull();
    });

    it('deberia mapear escenas como array de objetos', () => {
      const store = useAlmacenVistas360();
      store.vistas.forEach((vista) => {
        expect(Array.isArray(vista.escenas)).toBe(true);
        if (vista.escenas.length > 0) {
          expect(typeof vista.escenas[0].id).toBe('string');
          expect(typeof vista.escenas[0].medio).toBe('string');
          expect(typeof vista.escenas[0].tipoMedio).toBe('string');
        }
      });
    });

    it('deberia usar el modelo como identificador principal', () => {
      const store = useAlmacenVistas360();
      store.vistas.forEach((vista) => {
        expect(typeof vista.modelo).toBe('string');
        expect(vista.modelo.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Action: cargarVistas', () => {
    it('deberia ser una funcion definida', () => {
      const store = useAlmacenVistas360();
      expect(typeof store.cargarVistas).toBe('function');
    });

    it('deberia ejecutarse sin errores', () => {
      const store = useAlmacenVistas360();
      expect(() => store.cargarVistas()).not.toThrow();
    });

    it('deberia mantener los datos actuales tras recargar', () => {
      const store = useAlmacenVistas360();
      const cantidadAntes = store.vistas.length;
      store.cargarVistas();
      expect(store.vistas.length).toBe(cantidadAntes);
    });
  });

  describe('Action: seleccionarVista', () => {
    it('deberia ser una funcion definida', () => {
      const store = useAlmacenVistas360();
      expect(typeof store.seleccionarVista).toBe('function');
    });

    it('deberia establecer vistaActual con la vista correcta por ID real', () => {
      const store = useAlmacenVistas360();
      const idReal = store.vistas[0].id;
      store.seleccionarVista(idReal);
      expect(store.vistaActual).toEqual(store.vistas[0]);
    });

    it('deberia establecer vistaActual como null si no encuentra el ID', () => {
      const store = useAlmacenVistas360();
      store.seleccionarVista('id-no-existente');
      expect(store.vistaActual).toBeNull();
    });

    it('deberia manejar ID vacio', () => {
      const store = useAlmacenVistas360();
      store.seleccionarVista('');
      expect(store.vistaActual).toBeNull();
    });

    it('deberia manejar ID nulo', () => {
      const store = useAlmacenVistas360();
      store.seleccionarVista(null as unknown as string);
      expect(store.vistaActual).toBeNull();
    });

    it('deberia manejar ID undefined', () => {
      const store = useAlmacenVistas360();
      store.seleccionarVista(undefined as unknown as string);
      expect(store.vistaActual).toBeNull();
    });

    it('deberia sobrescribir la seleccion anterior', () => {
      const store = useAlmacenVistas360();
      if (store.vistas.length < 2) return;
      store.seleccionarVista(store.vistas[0].id);
      expect(store.vistaActual).toEqual(store.vistas[0]);
      store.seleccionarVista(store.vistas[1].id);
      expect(store.vistaActual).toEqual(store.vistas[1]);
    });

    it('deberia seleccionar vistas con escenas definidas', () => {
      const store = useAlmacenVistas360();
      const vistaConEscenas = store.vistas.find((v) => v.escenas.length > 0);
      if (!vistaConEscenas) return;
      store.seleccionarVista(vistaConEscenas.id);
      expect(store.vistaActual?.escenas.length).toBeGreaterThan(0);
    });
  });

  describe('Action: limpiarSeleccion', () => {
    it('deberia ser una funcion definida', () => {
      const store = useAlmacenVistas360();
      expect(typeof store.limpiarSeleccion).toBe('function');
    });

    it('deberia establecer vistaActual como null', () => {
      const store = useAlmacenVistas360();
      store.seleccionarVista(store.vistas[0].id);
      expect(store.vistaActual).not.toBeNull();
      store.limpiarSeleccion();
      expect(store.vistaActual).toBeNull();
    });

    it('deberia establecer vistaActual como null si ya es null', () => {
      const store = useAlmacenVistas360();
      store.limpiarSeleccion();
      expect(store.vistaActual).toBeNull();
      store.limpiarSeleccion();
      expect(store.vistaActual).toBeNull();
    });

    it('deberia ejecutarse sin errores', () => {
      const store = useAlmacenVistas360();
      expect(() => store.limpiarSeleccion()).not.toThrow();
    });
  });
});

describe('Validación de estructura de datos', () => {
  it('debería validar la estructura de vistas360.json5', async () => {
    const datos = await import('../datos/vistas360.json5');
    const vistas = datos.default;

    expect(Array.isArray(vistas)).toBe(true);
    expect(vistas.length).toBeGreaterThan(0);

    vistas.forEach((vista: any) => {
      expect(vista).toHaveProperty('id');
      expect(vista).toHaveProperty('categoria');
      expect(vista).toHaveProperty('modelo');
      expect(vista).toHaveProperty('tarjeta');
      expect(vista).toHaveProperty('escenas');
      expect(Array.isArray(vista.escenas)).toBe(true);
    });
  });

  it('debería validar que los IDs de vistas son únicos', async () => {
    const datos = await import('../datos/vistas360.json5');
    const vistas = datos.default;
    const ids = vistas.map((v: any) => v.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('debería validar que cada escena tiene propiedades requeridas', async () => {
    const datos = await import('../datos/vistas360.json5');
    const vistas = datos.default;

    vistas.forEach((vista: any) => {
      vista.escenas.forEach((escena: any) => {
        expect(escena).toHaveProperty('id');
        expect(escena).toHaveProperty('medio');
        expect(escena).toHaveProperty('tipoMedio');
        expect(escena.tipoMedio).toBe('imagen');
      });
    });
  });

  it('debería validar que los marcadores tienen estructura correcta', async () => {
    const datos = await import('../datos/vistas360.json5');
    const vistas = datos.default;

    vistas.forEach((vista: any) => {
      vista.escenas.forEach((escena: any) => {
        if (escena.marcadores && escena.marcadores.length > 0) {
          escena.marcadores.forEach((marcador: any) => {
            expect(marcador).toHaveProperty('id');
            expect(marcador).toHaveProperty('imagen');
            expect(marcador).toHaveProperty('posicion');
            expect(marcador.posicion).toHaveProperty('x');
            expect(marcador.posicion).toHaveProperty('y');
            expect(marcador).toHaveProperty('datos');
            expect(marcador.datos).toHaveProperty('tipo');

            if (marcador.datos.tipo === 'navegacion') {
              expect(marcador.datos).toHaveProperty('destino');
            } else if (marcador.datos.tipo === 'info') {
              expect(marcador.datos).toHaveProperty('titulo');
              expect(marcador.datos).toHaveProperty('descripcion');
            }
          });
        }
      });
    });
  });

  it('debería validar que las imágenes tienen rutas válidas', async () => {
    const datos = await import('../datos/vistas360.json5');
    const vistas = datos.default;

    vistas.forEach((vista: any) => {
      expect(vista.tarjeta).toMatch(/^\/img\//);
      vista.escenas.forEach((escena: any) => {
        expect(escena.medio).toMatch(/^\/img\//);
      });
    });
  });
});
