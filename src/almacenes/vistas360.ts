import { defineStore } from 'pinia'
import datosCrudos from '../datos/vistas360.json5'

export interface IPosicion {
  x: number
  y: number
}

export interface IDatosNavegacion {
  tipo: 'navegacion'
  destino: string
}

export interface IDatosInfo {
  tipo: 'info'
  titulo: string
  descripcion: string
}

export interface IMarcador {
  id: string
  imagen: string
  posicion: IPosicion
  datos: IDatosNavegacion | IDatosInfo
}

export interface IEscena {
  id: string
  medio: string
  tipoMedio: string
  posicion?: IPosicion
  marcadores: IMarcador[]
}

export interface IVista360 {
  id: string
  categoria: string
  modelo: string
  tarjeta: string
  marca?: string
  escenas: IEscena[]
}

interface Estado {
  vistas: IVista360[]
  seleccion: IVista360 | null
}

function mapearVistas(datos: any[]): IVista360[] {
  return datos.map((d: any) => ({
    id: d.id,
    categoria: d.categoria,
    modelo: d.modelo,
    tarjeta: d.tarjeta,
    marca: d.marca,
    escenas: (d.escenas || []).map((e: any) => ({
      id: e.id,
      medio: e.medio,
      tipoMedio: e.tipoMedio,
      posicion: e.posicion || { x: 0, y: 0 },
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
    seleccion: null,
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

    vistaActual(): IVista360 | null {
      return this.seleccion || this.vistas[0] || null
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
      this.seleccion = this.vistas.find((v) => v.id === id) || null
    },

    limpiarSeleccion() {
      this.seleccion = null
    },
  },
})
