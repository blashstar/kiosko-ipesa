import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAlmacenComparativas } from './comparativas';

describe('useAlmacenComparativas', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Estado inicial', () => {
    it('deberia inicializar comparativas con datos mapeados desde versus.json5', () => {
      const store = useAlmacenComparativas();
      expect(store.comparativas.length).toBeGreaterThan(0);
      expect(store.comparativas[0]).toHaveProperty('id');
      expect(store.comparativas[0]).toHaveProperty('tarjeta');
      expect(store.comparativas[0]).toHaveProperty('producto1');
      expect(store.comparativas[0]).toHaveProperty('producto2');
    });

    it('deberia inicializar comparativaActual con la primera comparativa', () => {
      const store = useAlmacenComparativas();
      expect(store.comparativaActual).toEqual(store.comparativas[0]);
    });

    it('deberia mapear correctamente los productos con modelo e imagen', () => {
      const store = useAlmacenComparativas();
      const primera = store.comparativas[0];
      expect(typeof primera.producto1.modelo).toBe('string');
      expect(typeof primera.producto1.imagen).toBe('string');
      expect(typeof primera.producto2.modelo).toBe('string');
      expect(typeof primera.producto2.imagen).toBe('string');
    });

    it('deberia tener IDs de comparativas con formato "VS-modelo-modelo"', () => {
      const store = useAlmacenComparativas();
      store.comparativas.forEach((comp) => {
        expect(comp.id).toMatch(/^VS-/);
      });
    });
  });

  describe('Action: cargarComparativas', () => {
    it('deberia ser una funcion definida', () => {
      const store = useAlmacenComparativas();
      expect(typeof store.cargarComparativas).toBe('function');
    });

    it('deberia ejecutarse sin errores', () => {
      const store = useAlmacenComparativas();
      expect(() => store.cargarComparativas()).not.toThrow();
    });

    it('deberia mantener los datos actuales tras recargar', () => {
      const store = useAlmacenComparativas();
      const cantidadAntes = store.comparativas.length;
      store.cargarComparativas();
      expect(store.comparativas.length).toBe(cantidadAntes);
    });
  });

  describe('Action: seleccionarComparativa', () => {
    it('deberia ser una funcion definida', () => {
      const store = useAlmacenComparativas();
      expect(typeof store.seleccionarComparativa).toBe('function');
    });

    it('deberia establecer comparativaActual con la comparativa correcta por ID real', () => {
      const store = useAlmacenComparativas();
      const idReal = store.comparativas[0].id;
      store.seleccionarComparativa(idReal);
      expect(store.comparativaActual).toEqual(store.comparativas[0]);
    });

    it('deberia establecer comparativaActual como la primera comparativa si no encuentra el ID', () => {
      const store = useAlmacenComparativas();
      const primera = store.comparativas[0];
      store.seleccionarComparativa('id-no-existente');
      expect(store.comparativaActual).toEqual(primera);
    });

    it('deberia manejar ID vacio', () => {
      const store = useAlmacenComparativas();
      const primera = store.comparativas[0];
      store.seleccionarComparativa('');
      expect(store.comparativaActual).toEqual(primera);
    });

    it('deberia manejar ID nulo', () => {
      const store = useAlmacenComparativas();
      const primera = store.comparativas[0];
      store.seleccionarComparativa(null as unknown as string);
      expect(store.comparativaActual).toEqual(primera);
    });

    it('deberia manejar ID undefined', () => {
      const store = useAlmacenComparativas();
      const primera = store.comparativas[0];
      store.seleccionarComparativa(undefined as unknown as string);
      expect(store.comparativaActual).toEqual(primera);
    });

    it('deberia sobrescribir la seleccion anterior', () => {
      const store = useAlmacenComparativas();
      if (store.comparativas.length < 2) return;
      store.seleccionarComparativa(store.comparativas[0].id);
      expect(store.comparativaActual).toEqual(store.comparativas[0]);
      store.seleccionarComparativa(store.comparativas[1].id);
      expect(store.comparativaActual).toEqual(store.comparativas[1]);
    });
  });

  describe('Action: limpiarSeleccion', () => {
    it('deberia ser una funcion definida', () => {
      const store = useAlmacenComparativas();
      expect(typeof store.limpiarSeleccion).toBe('function');
    });

    it('deberia volver a la primera comparativa al limpiar seleccion', () => {
      const store = useAlmacenComparativas();
      const primera = store.comparativas[0];
      store.seleccionarComparativa(store.comparativas[0].id);
      expect(store.comparativaActual).not.toBeNull();
      store.limpiarSeleccion();
      expect(store.comparativaActual).toEqual(primera);
    });

    it('deberia mantener la primera comparativa al limpiar si no habia seleccion', () => {
      const store = useAlmacenComparativas();
      const primera = store.comparativas[0];
      expect(store.comparativaActual).toEqual(primera);
      store.limpiarSeleccion();
      expect(store.comparativaActual).toEqual(primera);
    });

    it('deberia ejecutarse sin errores', () => {
      const store = useAlmacenComparativas();
      expect(() => store.limpiarSeleccion()).not.toThrow();
    });
  });
});
