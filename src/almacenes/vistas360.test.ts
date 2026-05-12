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
