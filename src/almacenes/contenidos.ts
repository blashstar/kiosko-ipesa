import { defineStore } from 'pinia'
import datos from '../datos/contenidos.json5'

export interface IInfografia {
  id: string
  titulo: string
  imagen: string
}

export interface IContenido {
  tituloApp: string
  fondoInicio?: string
  fondoMenu?: string
  infografias?: IInfografia[]
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
      // Los datos se cargan estáticamente desde contenidos.json5 en build time.
      // Este action queda como hook para futura carga dinámica si es necesaria.
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
