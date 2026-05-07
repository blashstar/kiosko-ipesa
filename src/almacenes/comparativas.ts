import { defineStore } from 'pinia'
import datos from '../datos/versus.json'

interface IComparativa {
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

export const useAlmacenComparativas = defineStore('comparativas', {
  state: (): Estado => ({
    comparativas: datos.comparativas || [],
    comparativaActual: null,
  }),

  actions: {
    cargarComparativas() {
      this.comparativas = datos.comparativas || []
    },
    seleccionarComparativa(id: string) {
      this.comparativaActual = this.comparativas.find((c) => c.id === id) || null
    },
    limpiarSeleccion() {
      this.comparativaActual = null
    },
  },
})
