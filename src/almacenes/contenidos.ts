import { defineStore } from 'pinia'
import datos from '../datos/contenidos.json'

interface IInfografia {
  id: string
  titulo: string
  imagen: string
}

interface IContenido {
  tituloApp: string
  fondoInicio: string
  fondoMenu: string
  infografias: IInfografia[]
}

interface Estado {
  contenidos: IContenido
  infografiaActual: IInfografia | null
}

export const useAlmacenContenidos = defineStore('contenidos', {
  state: (): Estado => ({
    contenidos: datos as IContenido,
    infografiaActual: null,
  }),

  getters: {
    infografias(): IInfografia[] {
      return this.contenidos.infografias || []
    },
  },

  actions: {
    cargarContenidos() {
      // Already loaded from JSON5
    },
    seleccionarInfografia(id: string) {
      this.infografiaActual =
        this.contenidos.infografias.find((i) => i.id === id) || null
    },
    limpiarSeleccion() {
      this.infografiaActual = null
    },
  },
})
