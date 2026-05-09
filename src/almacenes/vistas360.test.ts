import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAlmacenVistas360 } from './vistas360';

describe('useAlmacenVistas360', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Estado inicial', () => {
    it('debería inicializar vistas con datos mapeados desde vistas360.json5', () => {
      const store = useAlmacenVistas360();
      expect(store.vistas.length).toBeGreaterThan(0);
      expect(store.vistas[0]).toHaveProperty('id');
      expect(store.vistas[0]).toHaveProperty('nombre');
      expect(store.vistas[0]).toHaveProperty('miniatura');
      expect(store.vistas[0]).toHaveProperty('imagenes');
    });

    it('debería inicializar vistaActual como null', () => {
      const store = useAlmacenVistas360();
      expect(store.vistaActual).toBeNull();
    });

    it('debería mapear imagenes como array de rutas de escenas', () => {
      const store = useAlmacenVistas360();
      store.vistas.forEach((vista) => {
        expect(Array.isArray(vista.imagenes)).toBe(true);
        if (vista.imagenes.length > 0) {
          expect(typeof vista.imagenes[0]).toBe('string');
        }
      });
    });

    it('debería usar el modelo como nombre', () => {
      const store = useAlmacenVistas360();
      store.vistas.forEach((vista) => {
        expect(typeof vista.nombre).toBe('string');
        expect(vista.nombre.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Action: cargarVistas', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenVistas360();
      expect(typeof store.cargarVistas).toBe('function');
    });

    it('debería ejecutarse sin errores', () => {
      const store = useAlmacenVistas360();
      expect(() => store.cargarVistas()).not.toThrow();
    });

    it('debería mantener los datos actuales tras recargar', () => {
      const store = useAlmacenVistas360();
      const cantidadAntes = store.vistas.length;
      store.cargarVistas();
      expect(store.vistas.length).toBe(cantidadAntes);
    });
  });

  describe('Action: seleccionarVista', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenVistas360();
      expect(typeof store.seleccionarVista).toBe('function');
    });

    it('debería establecer vistaActual con la vista correcta por ID real', () => {
      const store = useAlmacenVistas360();
      const idReal = store.vistas[0].id;
      store.seleccionarVista(idReal);
      expect(store.vistaActual).toEqual(store.vistas[0]);
    });

    it('debería establecer vistaActual como null si no encuentra el ID', () => {
      const store = useAlmacenVistas360();
      store.seleccionarVista('id-no-existente');
      expect(store.vistaActual).toBeNull();
    });

    it('debería manejar ID vacío', () => {
      const store = useAlmacenVistas360();
      store.seleccionarVista('');
      expect(store.vistaActual).toBeNull();
    });

    it('debería manejar ID nulo', () => {
      const store = useAlmacenVistas360();
      store.seleccionarVista(null as unknown as string);
      expect(store.vistaActual).toBeNull();
    });

    it('debería manejar ID undefined', () => {
      const store = useAlmacenVistas360();
      store.seleccionarVista(undefined as unknown as string);
      expect(store.vistaActual).toBeNull();
    });

    it('debería sobrescribir la selección anterior', () => {
      const store = useAlmacenVistas360();
      if (store.vistas.length < 2) return;
      store.seleccionarVista(store.vistas[0].id);
      expect(store.vistaActual).toEqual(store.vistas[0]);
      store.seleccionarVista(store.vistas[1].id);
      expect(store.vistaActual).toEqual(store.vistas[1]);
    });

    it('debería incluir configuración opcional cuando exista', () => {
      const store = useAlmacenVistas360();
      const vistaConConfig = store.vistas.find((v) => v.configuracion !== undefined);
      if (!vistaConConfig) return;
      store.seleccionarVista(vistaConConfig.id);
      expect(store.vistaActual?.configuracion).toBeDefined();
    });
  });

  describe('Action: limpiarSeleccion', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenVistas360();
      expect(typeof store.limpiarSeleccion).toBe('function');
    });

    it('debería establecer vistaActual como null', () => {
      const store = useAlmacenVistas360();
      store.seleccionarVista(store.vistas[0].id);
      expect(store.vistaActual).not.toBeNull();
      store.limpiarSeleccion();
      expect(store.vistaActual).toBeNull();
    });

    it('debería mantener vistaActual como null si ya es null', () => {
      const store = useAlmacenVistas360();
      expect(store.vistaActual).toBeNull();
      store.limpiarSeleccion();
      expect(store.vistaActual).toBeNull();
    });

    it('debería ejecutarse sin errores', () => {
      const store = useAlmacenVistas360();
      expect(() => store.limpiarSeleccion()).not.toThrow();
    });
  });
});
