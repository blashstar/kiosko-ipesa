import { defineStore } from 'pinia'

/**
 * Tipos para el estado de la interfaz del kiosko
 */
export type SeccionActual =
  | 'inicio'
  | 'menu'
  | 'menu-vistas-360'
  | 'menu-infografias'
  | 'menu-comparativas'
  | 'vista-360'
  | 'infografia'
  | 'comparativa'

export type OrientacionPantalla = 'vertical' | 'horizontal' | 'cuadrada'

export interface EstadoInterfaz {
  seccionActual: SeccionActual
  mostrarCursor: boolean
  estaCargando: boolean
  mensajeError: string | null
  menuOpciones: {
    id: string
    nombre: string
    titulo: string
    tarjeta: string
  }[]
}

export const useAlmacenInterfaz = defineStore('interfaz', {
  state: (): EstadoInterfaz => ({
    seccionActual: 'inicio',
    mostrarCursor: true,
    estaCargando: false,
    mensajeError: null,
    menuOpciones: [
        { id: 'infografia', nombre: 'menu-infografias', titulo: 'Infografías', tarjeta: '/img/tarjetas/t-pagina-info.webp' },
        { id: 'comparativa', nombre: 'menu-comparativas', titulo: 'Duelo de gigantes', tarjeta: '/img/tarjetas/t-pagina-versus.webp' },
        { id: 'vista-360', nombre: 'menu-vistas-360', titulo: 'Vistas 360°', tarjeta: '/img/tarjetas/t-pagina-vista360.webp' },
      ]
  }),

  getters: {
    /**
     * Verifica si hay un error activo
     */
    tieneError(): boolean {
      return this.mensajeError !== null
    },
  },

  actions: {
    /**
     * Cambia la sección actual de la aplicación
     * @param seccion - Nombre de la sección a navegar
     */
    cambiarSeccion(seccion: SeccionActual): void {
      this.seccionActual = seccion
    },

    /**
     * Alterna la visibilidad del cursor
     * @param mostrar - Estado deseado del cursor
     */
    alternarCursor(mostrar: boolean = !this.mostrarCursor): void {
      this.mostrarCursor = mostrar
    },

    /**
     * Muestra un estado de carga
     * @param cargando - Estado de carga
     */
    setCargando(cargando: boolean = true): void {
      this.estaCargando = cargando
    },

    /**
     * Establece un mensaje de error
     * @param mensaje - Mensaje de error a mostrar
     */
    setError(mensaje: string | null): void {
      this.mensajeError = mensaje
    },

    /**
     * Limpia todos los mensajes de error
     */
    limpiarError(): void {
      this.mensajeError = null
    },

    /**
     * Resetea el estado de la interfaz a valores iniciales
     */
    resetear(): void {
      this.seccionActual = 'inicio'
      this.estaCargando = false
      this.mensajeError = null
    },
  },
})
