import { defineStore } from 'pinia'
import datosCrudos from '../datos/versus.json5'

export interface IComparativa {
  id: string
  titulo: string
  imagen: string
  producto1: { nombre: string; imagen: string; especificacion?: any }
  producto2: { nombre: string; imagen: string; especificacion?: any }
}

interface Estado {
  comparativas: IComparativa[]
  comparativaActual: IComparativa | null
}

function mapearComparativas(datos: any[]): IComparativa[] {
  return datos.map((d: any) => ({
    id: d.id,
    titulo: `${d.maquinas?.[0]?.modelo || ''} vs ${d.maquinas?.[1]?.modelo || ''}`,
    imagen: d.tarjeta,
    producto1: {
      nombre: d.maquinas?.[0]?.modelo || '',
      imagen: d.maquinas?.[0]?.imagen || '',
      especificacion: d.maquinas?.[0]?.carateristicas,
    },
    producto2: {
      nombre: d.maquinas?.[1]?.modelo || '',
      imagen: d.maquinas?.[1]?.imagen || '',
      especificacion: d.maquinas?.[1]?.carateristicas,
    },
  }))
}

const comparativasIniciales = mapearComparativas(
  Array.isArray(datosCrudos) ? datosCrudos : []
)

export const useAlmacenComparativas = defineStore('comparativas', {
  state: (): Estado => ({
    comparativas: comparativasIniciales,
    comparativaActual: null,
  }),

  actions: {
    cargarComparativas() {
      this.comparativas = comparativasIniciales
    },
    seleccionarComparativa(id: string) {
      this.comparativaActual = this.comparativas.find((c) => c.id === id) || null
    },
    limpiarSeleccion() {
      this.comparativaActual = null
    },
  },
})
