import { defineStore } from 'pinia'
import datosCrudos from '../datos/versus.json5'

export interface ICaracteristicaComparativa {
  titulo: string
  valor: string | string[],
  estiloValor?: any
}

export interface IMaquinaComparativa {
  id: string
  modelo: string
  imagen: string
  caracteristicas: ICaracteristicaComparativa[]
}

export interface IComparativa {
  id: string
  tarjeta: string
  categoria: string
  color: string
  estiloModelo?: any
  marca?: string
  maquinariaA: IMaquinaComparativa
  maquinariaB: IMaquinaComparativa
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
    categoria: d.categoria,
    color: d.color,
    estiloModelo: d.estiloModelo,
    marca: d.marca,
    maquinariaA: {
      id: d.maquinas?.[0]?.id || '',
      modelo: d.maquinas?.[0]?.modelo || '',
      imagen: d.maquinas?.[0]?.imagen || '',
      caracteristicas: d.maquinas?.[0]?.caracteristicas || [],
    },
    maquinariaB: {
      id: d.maquinas?.[1]?.id || '',
      modelo: d.maquinas?.[1]?.modelo || '',
      imagen: d.maquinas?.[1]?.imagen || '',
      caracteristicas: d.maquinas?.[1]?.caracteristicas || [],
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
      return this.seleccion || this.comparativas[2] || null
    },

    listaComparativas(): IResumenComparativa[] {
      return datosCrudos.map((d: any) => ({
        id: d.id,
        tarjeta: d.tarjeta,
        maquinariaA: {
          id: d.maquinas?.[0]?.id || '',
          categoria: d.categoria  || '',
          modelo: d.maquinas?.[0]?.modelo || '',
        },
        maquinariaB: {
          id: d.maquinas?.[1]?.id || '',
          categoria: d.categoria || '',
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
