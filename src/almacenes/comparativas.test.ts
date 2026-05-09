import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAlmacenComparativas } from './comparativas';

describe('useAlmacenComparativas', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Estado inicial', () => {
    it('debería inicializar comparativas con datos mapeados desde versus.json5', () => {
      const store = useAlmacenComparativas();
      expect(store.comparativas.length).toBeGreaterThan(0);
      expect(store.comparativas[0]).toHaveProperty('id');
      expect(store.comparativas[0]).toHaveProperty('titulo');
      expect(store.comparativas[0]).toHaveProperty('imagen');
      expect(store.comparativas[0]).toHaveProperty('producto1');
      expect(store.comparativas[0]).toHaveProperty('producto2');
    });

    it('debería inicializar comparativaActual como null', () => {
      const store = useAlmacenComparativas();
      expect(store.comparativaActual).toBeNull();
    });

    it('debería mapear correctamente los productos con nombre e imagen', () => {
      const store = useAlmacenComparativas();
      const primera = store.comparativas[0];
      expect(typeof primera.producto1.nombre).toBe('string');
      expect(typeof primera.producto1.imagen).toBe('string');
      expect(typeof primera.producto2.nombre).toBe('string');
      expect(typeof primera.producto2.imagen).toBe('string');
    });

    it('debería generar títulos con formato "modelo vs modelo"', () => {
      const store = useAlmacenComparativas();
      store.comparativas.forEach((comp) => {
        expect(comp.titulo).toMatch(/vs/i);
      });
    });
  });

  describe('Action: cargarComparativas', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenComparativas();
      expect(typeof store.cargarComparativas).toBe('function');
    });

    it('debería ejecutarse sin errores', () => {
      const store = useAlmacenComparativas();
      expect(() => store.cargarComparativas()).not.toThrow();
    });

    it('debería mantener los datos actuales tras recargar', () => {
      const store = useAlmacenComparativas();
      const cantidadAntes = store.comparativas.length;
      store.cargarComparativas();
      expect(store.comparativas.length).toBe(cantidadAntes);
    });
  });

  describe('Action: seleccionarComparativa', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenComparativas();
      expect(typeof store.seleccionarComparativa).toBe('function');
    });

    it('debería establecer comparativaActual con la comparativa correcta por ID real', () => {
      const store = useAlmacenComparativas();
      const idReal = store.comparativas[0].id;
      store.seleccionarComparativa(idReal);
      expect(store.comparativaActual).toEqual(store.comparativas[0]);
    });

    it('debería establecer comparativaActual como null si no encuentra el ID', () => {
      const store = useAlmacenComparativas();
      store.seleccionarComparativa('id-no-existente');
      expect(store.comparativaActual).toBeNull();
    });

    it('debería manejar ID vacío', () => {
      const store = useAlmacenComparativas();
      store.seleccionarComparativa('');
      expect(store.comparativaActual).toBeNull();
    });

    it('debería manejar ID nulo', () => {
      const store = useAlmacenComparativas();
      store.seleccionarComparativa(null as unknown as string);
      expect(store.comparativaActual).toBeNull();
    });

    it('debería manejar ID undefined', () => {
      const store = useAlmacenComparativas();
      store.seleccionarComparativa(undefined as unknown as string);
      expect(store.comparativaActual).toBeNull();
    });

    it('debería sobrescribir la selección anterior', () => {
      const store = useAlmacenComparativas();
      if (store.comparativas.length < 2) return;
      store.seleccionarComparativa(store.comparativas[0].id);
      expect(store.comparativaActual).toEqual(store.comparativas[0]);
      store.seleccionarComparativa(store.comparativas[1].id);
      expect(store.comparativaActual).toEqual(store.comparativas[1]);
    });
  });

  describe('Action: limpiarSeleccion', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenComparativas();
      expect(typeof store.limpiarSeleccion).toBe('function');
    });

    it('debería establecer comparativaActual como null', () => {
      const store = useAlmacenComparativas();
      store.seleccionarComparativa(store.comparativas[0].id);
      expect(store.comparativaActual).not.toBeNull();
      store.limpiarSeleccion();
      expect(store.comparativaActual).toBeNull();
    });

    it('debería mantener comparativaActual como null si ya es null', () => {
      const store = useAlmacenComparativas();
      expect(store.comparativaActual).toBeNull();
      store.limpiarSeleccion();
      expect(store.comparativaActual).toBeNull();
    });

    it('debería ejecutarse sin errores', () => {
      const store = useAlmacenComparativas();
      expect(() => store.limpiarSeleccion()).not.toThrow();
    });
  });
});
