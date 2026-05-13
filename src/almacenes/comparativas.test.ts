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
      expect(store.comparativas[0]).toHaveProperty('maquinariaA');
      expect(store.comparativas[0]).toHaveProperty('maquinariaB');
    });

    it('deberia inicializar comparativaActual con la primera comparativa', () => {
      const store = useAlmacenComparativas();
      expect(store.comparativaActual).toEqual(store.comparativas[0]);
    });

    it('deberia mapear correctamente los productos con modelo e imagen', () => {
      const store = useAlmacenComparativas();
      const primera = store.comparativas[0];
      expect(typeof primera.maquinariaA.modelo).toBe('string');
      expect(typeof primera.maquinariaA.imagen).toBe('string');
      expect(typeof primera.maquinariaB.modelo).toBe('string');
      expect(typeof primera.maquinariaB.imagen).toBe('string');
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

describe('Validación de estructura de datos', () => {
  it('debería validar la estructura de versus.json5', async () => {
    const datos = await import('../datos/versus.json5');
    const comparativas = datos.default;

    expect(Array.isArray(comparativas)).toBe(true);
    expect(comparativas.length).toBeGreaterThan(0);

    comparativas.forEach((comparativa: any) => {
      expect(comparativa).toHaveProperty('id');
      expect(comparativa).toHaveProperty('categoria');
      expect(comparativa).toHaveProperty('color');
      expect(comparativa).toHaveProperty('maquinas');
      expect(Array.isArray(comparativa.maquinas)).toBe(true);
      expect(comparativa.maquinas.length).toBe(2);
    });
  });

  it('debería validar que los IDs de comparativas son únicos', async () => {
    const datos = await import('../datos/versus.json5');
    const comparativas = datos.default;
    const ids = comparativas.map((c: any) => c.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('debería validar que cada máquina tiene caracteristicas', async () => {
    const datos = await import('../datos/versus.json5');
    const comparativas = datos.default;

    comparativas.forEach((comparativa: any) => {
      comparativa.maquinas.forEach((maquina: any) => {
        expect(maquina).toHaveProperty('caracteristicas');
        expect(Array.isArray(maquina.caracteristicas)).toBe(true);
      });
    });
  });

  it('debería validar que las imágenes tienen rutas válidas', async () => {
    const datos = await import('../datos/versus.json5');
    const comparativas = datos.default;

    comparativas.forEach((comparativa: any) => {
      comparativa.maquinas.forEach((maquina: any) => {
        expect(maquina.imagen).toMatch(/^\/img\//);
      });
    });
  });
});
