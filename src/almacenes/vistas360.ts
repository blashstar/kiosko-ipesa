import { defineStore } from 'pinia'
import datosCrudos from '../datos/vistas360.json5'

export interface IPosicion {
  yaw: number
  pitch: number
}

export interface ISize {
  width: number
  height: number
}

export interface IMarcadorNavegacion {
  id: string
  image: string
  position: IPosicion
  size: ISize
  tooltip: string
  data: {
    tipo: 'navegacion'
    escenaDestino: string
  }
  anchor: string
}

export interface IMarcadorInformativo {
  id: string
  image: string
  position: IPosicion
  size: ISize
  tooltip: {
    content: string
    className: string
    position: string
    trigger: string
  }
  anchor: string
}

export type Marcador = IMarcadorNavegacion | IMarcadorInformativo | any

export interface IEscena {
  id: string
  medio: string
  tipoMedio: string
  posicionInicial?: IPosicion
  marcadores: Marcador[]
}

export interface IVista360 {
  id: string
  categoria: string
  modelo: string
  tarjeta: string
  escenas: IEscena[]
}

interface Estado {
  vistas: IVista360[]
  vistaActual: IVista360 | null
}

function mapearVistas(datos: any[]): IVista360[] {
  return datos.map((d: any) => ({
    id: d.id,
    categoria: d.categoria,
    modelo: d.modelo,
    tarjeta: d.tarjeta,
    escenas: (d.escenas || []).map((e: any) => ({
      id: e.id,
      medio: e.medio,
      tipoMedio: e.tipoMedio,
      posicionInicial: e.posicionInicial || { yaw: 0, pitch: 0 },
      marcadores: e.marcadores || [],
    })),
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

  getters: {
    listaMaquinarias(): Array<{ id: string; modelo: string; categoria: string; tarjeta: string }> {
      return this.vistas.map((v) => ({
        id: v.id,
        modelo: v.modelo,
        categoria: v.categoria,
        tarjeta: v.tarjeta,
      }))
    },

    maquinariaPorId: (state) => (id: string): IVista360 | undefined => {
      return state.vistas.find((v) => v.id === id)
    },
  },

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
