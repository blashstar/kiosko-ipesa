import { defineStore } from 'pinia'
import datosCrudos from '../datos/vistas360.json5'

export interface IVista360 {
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

function mapearVistas(datos: any[]): IVista360[] {
  return datos.map((d: any) => ({
    id: d.id,
    nombre: d.modelo,
    miniatura: d.tarjeta,
    imagenes: d.escenas?.map((e: any) => e.medio) || [],
    configuracion: d.configuracion,
  }))
}

const vistasIniciales = mapearVistas(
  Array.isArray(datosCrudos) ? datosCrudos : []
)

export const useAlmacenVistas360 = defineStore('vistas360', {
  state: (): Estado => ({
    vistas: vistasIniciales,
    vistaActual: null,
  }),

  actions: {
    cargarVistas() {
      this.vistas = vistasIniciales
    },
    seleccionarVista(id: string) {
      this.vistaActual = this.vistas.find((v) => v.id === id) || null
    },
    limpiarSeleccion() {
      this.vistaActual = null
    },
  },
})
