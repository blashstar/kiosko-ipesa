import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAlmacenInfografias } from './infografias';

describe('useAlmacenInfografias', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Estado inicial', () => {
    it('debería inicializar infografias con datos mapeados desde info.json5', () => {
      const store = useAlmacenInfografias();
      expect(store.infografias.length).toBeGreaterThan(0);
    });

    it('debería inicializar infografiaActual con la primera infografia', () => {
      const store = useAlmacenInfografias();
      expect(store.infografiaActual).toEqual(store.infografias[0]);
    });

    it('debería inicializar categoriaActiva como null', () => {
      const store = useAlmacenInfografias();
      expect(store.categoriaActiva).toBeNull();
    });

    it('debería mapear correctamente la estructura de cada infografia', () => {
      const store = useAlmacenInfografias();
      const primera = store.infografias[0];
      expect(primera).toHaveProperty('id');
      expect(primera).toHaveProperty('categoria');
      expect(primera).toHaveProperty('modelo');
      expect(primera).toHaveProperty('descripcion');
      expect(primera).toHaveProperty('imagen');
      expect(primera).toHaveProperty('color');
      expect(primera).toHaveProperty('plantilla');
      expect(primera).toHaveProperty('perfiles');
      expect(primera).toHaveProperty('detalles');
      expect(primera).toHaveProperty('especificaciones');
      expect(primera).toHaveProperty('caracteristicas');
      expect(primera).toHaveProperty('marca');
    });

    it('debería mapear marca cuando existe en los datos', () => {
      const store = useAlmacenInfografias();
      const conMarca = store.infografias.find((i) => i.id === 'CHHC110');
      expect(conMarca?.marca).toBe('Hamm');
    });

    it('debería mapear marca como undefined cuando no está en los datos', () => {
      const store = useAlmacenInfografias();
      const sinMarca = store.infografias.find((i) => i.id === 'E350P');
      expect(sinMarca?.marca).toBeUndefined();
    });

    it('debería tener IDs únicos', () => {
      const store = useAlmacenInfografias();
      const ids = store.infografias.map((i) => i.id);
      const unicos = new Set(ids);
      expect(ids.length).toBe(unicos.size);
    });
  });

  describe('Getter: categorias', () => {
    it('debería devolver un array de categorías únicas', () => {
      const store = useAlmacenInfografias();
      expect(store.categorias.length).toBeGreaterThan(0);
      store.categorias.forEach((cat) => {
        expect(typeof cat).toBe('string');
      });
    });

    it('no debería tener categorías duplicadas', () => {
      const store = useAlmacenInfografias();
      const unicos = new Set(store.categorias);
      expect(store.categorias.length).toBe(unicos.size);
    });
  });

  describe('Getter: porCategoria', () => {
    it('debería agrupar infografias por categoría', () => {
      const store = useAlmacenInfografias();
      const agrupado = store.porCategoria;
      expect(Object.keys(agrupado).length).toBeGreaterThan(0);
      Object.values(agrupado).forEach((lista) => {
        expect(Array.isArray(lista)).toBe(true);
      });
    });

    it('cada grupo debería contener solo infografias de esa categoría', () => {
      const store = useAlmacenInfografias();
      Object.entries(store.porCategoria).forEach(([categoria, lista]) => {
        lista.forEach((infografia) => {
          expect(infografia.categoria).toBe(categoria);
        });
      });
    });
  });

  describe('Getter: total', () => {
    it('debería devolver la cantidad total de infografias', () => {
      const store = useAlmacenInfografias();
      expect(store.total).toBe(store.infografias.length);
      expect(store.total).toBeGreaterThan(0);
    });
  });

  describe('Action: cargarInfografias', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenInfografias();
      expect(typeof store.cargarInfografias).toBe('function');
    });

    it('debería ejecutarse sin errores', () => {
      const store = useAlmacenInfografias();
      expect(() => store.cargarInfografias()).not.toThrow();
    });

    it('debería mantener los datos actuales tras recargar', () => {
      const store = useAlmacenInfografias();
      const cantidadAntes = store.infografias.length;
      store.cargarInfografias();
      expect(store.infografias.length).toBe(cantidadAntes);
    });
  });

  describe('Action: seleccionarInfografia', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenInfografias();
      expect(typeof store.seleccionarInfografia).toBe('function');
    });

    it('debería establecer infografiaActual con la infografia correcta por ID real', () => {
      const store = useAlmacenInfografias();
      const idReal = store.infografias[0].id;
      store.seleccionarInfografia(idReal);
      expect(store.infografiaActual).toEqual(store.infografias[0]);
    });

    it('debería establecer infografiaActual como la primera infografia si no encuentra el ID', () => {
      const store = useAlmacenInfografias();
      const primera = store.infografias[0];
      store.seleccionarInfografia('id-no-existente');
      expect(store.infografiaActual).toEqual(primera);
    });

    it('debería manejar ID vacío', () => {
      const store = useAlmacenInfografias();
      const primera = store.infografias[0];
      store.seleccionarInfografia('');
      expect(store.infografiaActual).toEqual(primera);
    });

    it('debería manejar ID nulo', () => {
      const store = useAlmacenInfografias();
      const primera = store.infografias[0];
      store.seleccionarInfografia(null as unknown as string);
      expect(store.infografiaActual).toEqual(primera);
    });

    it('debería manejar ID undefined', () => {
      const store = useAlmacenInfografias();
      const primera = store.infografias[0];
      store.seleccionarInfografia(undefined as unknown as string);
      expect(store.infografiaActual).toEqual(primera);
    });

    it('debería sobrescribir la selección anterior', () => {
      const store = useAlmacenInfografias();
      if (store.infografias.length < 2) return;
      store.seleccionarInfografia(store.infografias[0].id);
      expect(store.infografiaActual).toEqual(store.infografias[0]);
      store.seleccionarInfografia(store.infografias[1].id);
      expect(store.infografiaActual).toEqual(store.infografias[1]);
    });
  });

  describe('Action: limpiarSeleccion', () => {
    it('debería ser una función definida', () => {
      const store = useAlmacenInfografias();
      expect(typeof store.limpiarSeleccion).toBe('function');
    });

    it('debería volver a la primera infografia al limpiar selección', () => {
      const store = useAlmacenInfografias();
      const primera = store.infografias[0];
      store.seleccionarInfografia(store.infografias[0].id);
      expect(store.infografiaActual).not.toBeNull();
      store.limpiarSeleccion();
      expect(store.infografiaActual).toEqual(primera);
    });

    it('debería mantener la primera infografia al limpiar si no había selección', () => {
      const store = useAlmacenInfografias();
      const primera = store.infografias[0];
      expect(store.infografiaActual).toEqual(primera);
      store.limpiarSeleccion();
      expect(store.infografiaActual).toEqual(primera);
    });

    it('debería ejecutarse sin errores', () => {
      const store = useAlmacenInfografias();
      expect(() => store.limpiarSeleccion()).not.toThrow();
    });
  });

  describe('Action: filtrarPorCategoria', () => {
    it('debería establecer categoriaActiva', () => {
      const store = useAlmacenInfografias();
      store.filtrarPorCategoria('EXCAVADORA');
      expect(store.categoriaActiva).toBe('EXCAVADORA');
    });

    it('debería permitir limpiar el filtro con null', () => {
      const store = useAlmacenInfografias();
      store.filtrarPorCategoria('EXCAVADORA');
      store.filtrarPorCategoria(null);
      expect(store.categoriaActiva).toBeNull();
    });
  });
});
