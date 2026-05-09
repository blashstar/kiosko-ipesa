import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAlmacenContenidos } from './contenidos';

describe('useAlmacenContenidos', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Estado inicial', () => {
    it('debería inicializar con los contenidos cargados desde el archivo JSON5', () => {
      const store = useAlmacenContenidos();
      expect(store.contenidos.tituloApp).toBe('KIOSCO IPESA');
      expect(store.contenidos.fondoInicio).toBe('/img/fondos/inicio.jpg');
      expect(store.contenidos.fondoMenu).toBe('/img/fondos/menu.jpg');
      expect(store.contenidos.infografias).toHaveLength(2);
    });

    it('debería inicializar con infografiaActual como null', () => {
      const store = useAlmacenContenidos();
      expect(store.infografiaActual).toBeNull();
    });

    it('debería tener el título de la app correctamente cargado', () => {
      const store = useAlmacenContenidos();
      expect(store.contenidos.tituloApp).toBe('KIOSCO IPESA');
    });

    it('debería tener las rutas de fondo correctamente cargadas', () => {
      const store = useAlmacenContenidos();
      expect(store.contenidos.fondoInicio).toBe('/img/fondos/inicio.jpg');
      expect(store.contenidos.fondoMenu).toBe('/img/fondos/menu.jpg');
    });

    it('debería tener el array de infografías cargado', () => {
      const store = useAlmacenContenidos();
      expect(store.contenidos.infografias).toHaveLength(2);
      expect(store.contenidos.infografias[0].id).toBe('info-1');
      expect(store.contenidos.infografias[1].id).toBe('info-2');
    });
  });

  describe('Getter: infografias', () => {
    it('debería devolver el array de infografías', () => {
      const store = useAlmacenContenidos();
      const result = store.infografias;
      expect(result).toEqual(store.contenidos.infografias);
    });

    it('debería devolver un array vacío si contenidos.infografias es null', () => {
      const store = useAlmacenContenidos();
      const originalInfografias = store.contenidos.infografias;
      store.contenidos.infografias = null as unknown as typeof originalInfografias;

      expect(store.infografias).toEqual([]);

      store.contenidos.infografias = originalInfografias;
    });

    it('debería devolver un array vacío si contenidos.infografias es undefined', () => {
      const store = useAlmacenContenidos();
      const originalInfografias = store.contenidos.infografias;
      store.contenidos.infografias = undefined as unknown as typeof originalInfografias;

      expect(store.infografias).toEqual([]);

      store.contenidos.infografias = originalInfografias;
    });

    it('debería devolver el mismo array si contenidos.infografias es un array vacío', () => {
      const store = useAlmacenContenidos();
      const originalInfografias = store.contenidos.infografias;
      store.contenidos.infografias = [];

      expect(store.infografias).toEqual([]);

      store.contenidos.infografias = originalInfografias;
    });
  });

  describe('Action: cargarContenidos', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenContenidos();
      expect(typeof store.cargarContenidos).toBe('function');
    });

    it('debería ejecutarse sin errores', () => {
      const store = useAlmacenContenidos();
      expect(() => store.cargarContenidos()).not.toThrow();
    });

    it('debería mantener los datos actuales (carga estática)', () => {
      const store = useAlmacenContenidos();
      const tituloAntes = store.contenidos.tituloApp;
      const fondoInicioAntes = store.contenidos.fondoInicio;
      const fondoMenuAntes = store.contenidos.fondoMenu;
      const infografiasAntes = store.contenidos.infografias.slice();
      store.cargarContenidos();
      expect(store.contenidos.tituloApp).toBe(tituloAntes);
      expect(store.contenidos.fondoInicio).toBe(fondoInicioAntes);
      expect(store.contenidos.fondoMenu).toBe(fondoMenuAntes);
      expect(store.contenidos.infografias).toEqual(infografiasAntes);
    });
  });

  describe('Action: seleccionarInfografia', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenContenidos();
      expect(typeof store.seleccionarInfografia).toBe('function');
    });

    it('debería establecer infografiaActual con la infografía correcta por ID', () => {
      const store = useAlmacenContenidos();
      store.seleccionarInfografia('info-1');
      expect(store.infografiaActual).toEqual(store.contenidos.infografias[0]);
    });

    it('debería establecer infografiaActual con la segunda infografía', () => {
      const store = useAlmacenContenidos();
      store.seleccionarInfografia('info-2');
      expect(store.infografiaActual).toEqual(store.contenidos.infografias[1]);
    });

    it('debería establecer infografiaActual como null si no encuentra el ID', () => {
      const store = useAlmacenContenidos();
      store.seleccionarInfografia('info-no-existente');
      expect(store.infografiaActual).toBeNull();
    });

    it('debería manejar ID vacío', () => {
      const store = useAlmacenContenidos();
      store.seleccionarInfografia('');
      expect(store.infografiaActual).toBeNull();
    });

    it('debería manejar ID nulo', () => {
      const store = useAlmacenContenidos();
      store.seleccionarInfografia(null as unknown as string);
      expect(store.infografiaActual).toBeNull();
    });

    it('debería manejar ID undefined', () => {
      const store = useAlmacenContenidos();
      store.seleccionarInfografia(undefined as unknown as string);
      expect(store.infografiaActual).toBeNull();
    });

    it('debería sobrescribir la selección anterior', () => {
      const store = useAlmacenContenidos();
      store.seleccionarInfografia('info-1');
      expect(store.infografiaActual).toEqual(store.contenidos.infografias[0]);
      store.seleccionarInfografia('info-2');
      expect(store.infografiaActual).toEqual(store.contenidos.infografias[1]);
    });
  });

  describe('Action: limpiarSeleccion', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenContenidos();
      expect(typeof store.limpiarSeleccion).toBe('function');
    });

    it('debería establecer infografiaActual como null', () => {
      const store = useAlmacenContenidos();
      store.seleccionarInfografia('info-1');
      expect(store.infografiaActual).not.toBeNull();
      store.limpiarSeleccion();
      expect(store.infografiaActual).toBeNull();
    });

    it('debería mantener infografiaActual como null si ya es null', () => {
      const store = useAlmacenContenidos();
      expect(store.infografiaActual).toBeNull();
      store.limpiarSeleccion();
      expect(store.infografiaActual).toBeNull();
    });

    it('debería ejecutarse sin errores', () => {
      const store = useAlmacenContenidos();
      expect(() => store.limpiarSeleccion()).not.toThrow();
    });
  });
});

describe('Validación de estructura de datos', () => {
  it('debería validar la estructura de contenidos.json5', async () => {
    const datos = await import('../datos/contenidos.json5');

    expect(datos.default).toBeDefined();
    expect(datos.default).toHaveProperty('tituloApp');
    expect(datos.default).toHaveProperty('fondoInicio');
    expect(datos.default).toHaveProperty('fondoMenu');
    expect(datos.default).toHaveProperty('infografias');

    expect(Array.isArray(datos.default.infografias)).toBe(true);

    if (datos.default.infografias.length > 0) {
      datos.default.infografias.forEach((infografia: any) => {
        expect(infografia).toHaveProperty('id');
        expect(infografia).toHaveProperty('titulo');
        expect(infografia).toHaveProperty('imagen');
        expect(typeof infografia.id).toBe('string');
        expect(typeof infografia.titulo).toBe('string');
        expect(typeof infografia.imagen).toBe('string');
      });
    }
  });

  it('debería validar que los IDs de infografías son únicos', async () => {
    const datos = await import('../datos/contenidos.json5');
    const infografias = datos.default.infografias || [];

    if (infografias.length > 1) {
      const ids = infografias.map((i: any) => i.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    }
  });

  it('debería validar que las imágenes tienen rutas válidas', async () => {
    const datos = await import('../datos/contenidos.json5');
    const infografias = datos.default.infografias || [];

    infografias.forEach((infografia: any) => {
      expect(infografia.imagen).toMatch(/^\/img\//);
    });
  });
});
