import { defineStore } from 'pinia'

type Seccion =
  | 'inicio'
  | 'menu'
  | 'menu-vistas-360'
  | 'menu-infografias'
  | 'menu-comparativas'
  | 'vista-360'
  | 'infografia'
  | 'comparativa'

interface Estado {
  seccionActual: Seccion
 seccionAnterior: Seccion | null
}

export const useAlmacenInterfaz = defineStore('interfaz', {
  state: (): Estado => ({
    seccionActual: 'inicio',
    seccionAnterior: null,
  }),

  actions: {
    cambiarSeccion(nuevaSeccion: Seccion) {
      this.seccionAnterior = this.seccionActual
      this.seccionActual = nuevaSeccion
    },

    volver() {
      if (this.seccionAnterior) {
        this.seccionActual = this.seccionAnterior
        this.seccionAnterior = null
      }
    },
  },
})