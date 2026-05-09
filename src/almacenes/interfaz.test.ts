import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAlmacenInterfaz } from './interfaz';
import type { SeccionActual } from './interfaz';

describe('useAlmacenInterfaz', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Estado inicial', () => {
    it('debería inicializar seccionActual como "inicio"', () => {
      const store = useAlmacenInterfaz();
      expect(store.seccionActual).toBe('inicio');
    });

    it('debería inicializar mostrarCursor como true', () => {
      const store = useAlmacenInterfaz();
      expect(store.mostrarCursor).toBe(true);
    });

    it('debería inicializar estaCargando como false', () => {
      const store = useAlmacenInterfaz();
      expect(store.estaCargando).toBe(false);
    });

    it('debería inicializar mensajeError como null', () => {
      const store = useAlmacenInterfaz();
      expect(store.mensajeError).toBeNull();
    });

    it('debería tener 3 opciones de menú cargadas', () => {
      const store = useAlmacenInterfaz();
      expect(store.menuOpciones).toHaveLength(3);
      expect(store.menuOpciones[0].id).toBe('infografia');
      expect(store.menuOpciones[1].id).toBe('comparativa');
      expect(store.menuOpciones[2].id).toBe('vista-360');
    });
  });

  describe('Getter: tieneError', () => {
    it('debería devolver false cuando no hay error', () => {
      const store = useAlmacenInterfaz();
      expect(store.tieneError).toBe(false);
    });

    it('debería devolver true cuando hay un error', () => {
      const store = useAlmacenInterfaz();
      store.setError('Algo salió mal');
      expect(store.tieneError).toBe(true);
    });
  });

  describe('Action: cambiarSeccion', () => {
    it('debería cambiar la sección actual', () => {
      const store = useAlmacenInterfaz();
      store.cambiarSeccion('menu' as SeccionActual);
      expect(store.seccionActual).toBe('menu');
    });

    it('debería permitir cambiar a cualquier sección válida', () => {
      const store = useAlmacenInterfaz();
      const secciones: SeccionActual[] = [
        'inicio',
        'menu',
        'menu-vistas-360',
        'menu-infografias',
        'menu-comparativas',
        'vista-360',
        'infografia',
        'comparativa',
      ];
      secciones.forEach((seccion) => {
        store.cambiarSeccion(seccion);
        expect(store.seccionActual).toBe(seccion);
      });
    });
  });

  describe('Action: alternarCursor', () => {
    it('debería alternar el cursor por defecto', () => {
      const store = useAlmacenInterfaz();
      expect(store.mostrarCursor).toBe(true);
      store.alternarCursor();
      expect(store.mostrarCursor).toBe(false);
      store.alternarCursor();
      expect(store.mostrarCursor).toBe(true);
    });

    it('debería establecer el cursor a un valor específico', () => {
      const store = useAlmacenInterfaz();
      store.alternarCursor(false);
      expect(store.mostrarCursor).toBe(false);
      store.alternarCursor(true);
      expect(store.mostrarCursor).toBe(true);
    });
  });

  describe('Action: setCargando', () => {
    it('debería establecer estaCargando a true por defecto', () => {
      const store = useAlmacenInterfaz();
      store.setCargando();
      expect(store.estaCargando).toBe(true);
    });

    it('debería establecer estaCargando al valor pasado', () => {
      const store = useAlmacenInterfaz();
      store.setCargando(true);
      expect(store.estaCargando).toBe(true);
      store.setCargando(false);
      expect(store.estaCargando).toBe(false);
    });
  });

  describe('Action: setError', () => {
    it('debería establecer un mensaje de error', () => {
      const store = useAlmacenInterfaz();
      store.setError('Error de prueba');
      expect(store.mensajeError).toBe('Error de prueba');
      expect(store.tieneError).toBe(true);
    });

    it('debería permitir establecer error como null', () => {
      const store = useAlmacenInterfaz();
      store.setError('Error');
      store.setError(null);
      expect(store.mensajeError).toBeNull();
      expect(store.tieneError).toBe(false);
    });
  });

  describe('Action: limpiarError', () => {
    it('debería limpiar el mensaje de error', () => {
      const store = useAlmacenInterfaz();
      store.setError('Error');
      store.limpiarError();
      expect(store.mensajeError).toBeNull();
      expect(store.tieneError).toBe(false);
    });

    it('debería mantener mensajeError como null si ya es null', () => {
      const store = useAlmacenInterfaz();
      expect(store.mensajeError).toBeNull();
      store.limpiarError();
      expect(store.mensajeError).toBeNull();
    });
  });

  describe('Action: resetear', () => {
    it('debería resetear seccionActual a inicio', () => {
      const store = useAlmacenInterfaz();
      store.cambiarSeccion('menu' as SeccionActual);
      store.resetear();
      expect(store.seccionActual).toBe('inicio');
    });

    it('debería resetear estaCargando a false', () => {
      const store = useAlmacenInterfaz();
      store.setCargando(true);
      store.resetear();
      expect(store.estaCargando).toBe(false);
    });

    it('debería resetear mensajeError a null', () => {
      const store = useAlmacenInterfaz();
      store.setError('Error');
      store.resetear();
      expect(store.mensajeError).toBeNull();
    });

    it('no debería modificar mostrarCursor', () => {
      const store = useAlmacenInterfaz();
      store.alternarCursor(false);
      store.resetear();
      expect(store.mostrarCursor).toBe(false);
    });
  });
});
