import { defineStore } from 'pinia'
import datosCrudos from '../datos/info.json5'

export interface IDetalle {
  titulo: string
  valor: string
}

export interface IEspecificacion {
  icono: string
  titulo: string
  valor: string
}

export interface IMarcador {
  x: number
  y: number
  d: string
}

export interface ICaracteristica {
  marcador: IMarcador
  icono: string
  titulo: string
  descripcion: string
}

export interface IInfografia {
  id: string
  categoria: string
  modelo: string
  descripcion: string
  imagen: string
  color: string
  plantilla: string
  perfiles: string
  detalles: IDetalle[]
  especificaciones: IEspecificacion[]
  caracteristicas: ICaracteristica[]
}

interface Estado {
  infografias: IInfografia[]
  infografiaActual: IInfografia | null
  categoriaActiva: string | null
}

function mapearInfografias(datos: any[]): IInfografia[] {
  return datos.map((d: any) => ({
    id: d.id,
    categoria: d.categoria,
    modelo: d.modelo,
    descripcion: d.descripcion,
    imagen: d.imagen,
    color: d.color,
    plantilla: d.plantilla,
    perfiles: d.perfiles,
    detalles: d.detalles || [],
    especificaciones: d.especificaciones || [],
    caracteristicas: d.caracteristicas || [],
  }))
}

const infografiasIniciales = mapearInfografias(
  Array.isArray(datosCrudos) ? datosCrudos : []
)

export const useAlmacenInfografias = defineStore('infografias', {
  state: (): Estado => ({
    infografias: infografiasIniciales,
    infografiaActual: null,
    categoriaActiva: null,
  }),

  getters: {
    categorias(): string[] {
      return [...new Set(this.infografias.map((i) => i.categoria))]
    },

    porCategoria(): Record<string, IInfografia[]> {
      return this.infografias.reduce((acc, infografia) => {
        const cat = infografia.categoria
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(infografia)
        return acc
      }, {} as Record<string, IInfografia[]>)
    },

    total(): number {
      return this.infografias.length
    },
  },

  actions: {
    cargarInfografias() {
      this.infografias = infografiasIniciales
    },

    seleccionarInfografia(id: string) {
      this.infografiaActual = this.infografias.find((i) => i.id === id) || null
    },

    limpiarSeleccion() {
      this.infografiaActual = null
    },

    filtrarPorCategoria(categoria: string | null) {
      this.categoriaActiva = categoria
    },
  },
})
