import { defineStore } from 'pinia'
import datosCrudos from '../datos/versus.json5'

export interface ICaracteristicaComparativa {
  titulo: string
  valor: string
}

export interface IMaquinaComparativa {
  id: string
  categoria: string
  modelo: string
  imagen: string
  carateristicas: ICaracteristicaComparativa[]
}

export interface IComparativa {
  id: string
  tarjeta: string
  producto1: Omit<IMaquinaComparativa, 'categoria'>
  producto2: Omit<IMaquinaComparativa, 'categoria'>
}

export interface IResumenComparativa {
  id: string
  tarjeta: string
  maquinariaA: { id: string; categoria: string; modelo: string }
  maquinariaB: { id: string; categoria: string; modelo: string }
}

interface Estado {
  comparativas: IComparativa[]
  seleccion: IComparativa | null
}

function mapearComparativas(datos: any[]): IComparativa[] {
  return datos.map((d: any) => ({
    id: d.id,
    tarjeta: d.tarjeta,
    producto1: {
      id: d.maquinas?.[0]?.id || '',
      modelo: d.maquinas?.[0]?.modelo || '',
      imagen: d.maquinas?.[0]?.imagen || '',
      carateristicas: d.maquinas?.[0]?.carateristicas || [],
    },
    producto2: {
      id: d.maquinas?.[1]?.id || '',
      modelo: d.maquinas?.[1]?.modelo || '',
      imagen: d.maquinas?.[1]?.imagen || '',
      carateristicas: d.maquinas?.[1]?.carateristicas || [],
    },
  }))
}

const comparativasIniciales = mapearComparativas(
  Array.isArray(datosCrudos) ? datosCrudos : []
)

export const useAlmacenComparativas = defineStore('comparativas', {
  state: (): Estado => ({
    comparativas: comparativasIniciales,
    seleccion: null,
  }),

  getters: {
    comparativaActual(): IComparativa | null {
      return this.seleccion || this.comparativas[0] || null
    },

    listaComparativas(): IResumenComparativa[] {
      return datosCrudos.map((d: any) => ({
        id: d.id,
        tarjeta: d.tarjeta,
        maquinariaA: {
          id: d.maquinas?.[0]?.id || '',
          categoria: d.maquinas?.[0]?.categoria || '',
          modelo: d.maquinas?.[0]?.modelo || '',
        },
        maquinariaB: {
          id: d.maquinas?.[1]?.id || '',
          categoria: d.maquinas?.[1]?.categoria || '',
          modelo: d.maquinas?.[1]?.modelo || '',
        },
      }))
    },
  },

  actions: {
    cargarComparativas() {
      this.comparativas = comparativasIniciales
    },

    seleccionarComparativa(id: string) {
      this.seleccion = this.comparativas.find((c) => c.id === id) || null
    },

    limpiarSeleccion() {
      this.seleccion = null
    },
  },
})
