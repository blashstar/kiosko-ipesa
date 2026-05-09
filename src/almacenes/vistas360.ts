import { defineStore } from 'pinia'
import datos from '../datos/vistas360.json5'

interface IVista360 {
  id: string
  nombre: string
  miniatura: string
  imagenes: string[]
  configuracion?: {
    velocidad?: number
    sensibilidad?: number
  }
}

interface Estado {
  vistas: IVista360[]
  vistaActual: IVista360 | null
}

export const useAlmacenVistas360 = defineStore('vistas360', {
  state: (): Estado => ({
    vistas: datos.vistas || [],
    vistaActual: null,
  }),

  actions: {
    cargarVistas() {
      this.vistas = datos.vistas || []
    },
    seleccionarVista(id: string) {
      this.vistaActual = this.vistas.find((v) => v.id === id) || null
    },
    limpiarSeleccion() {
      this.vistaActual = null
    },
  },
})
