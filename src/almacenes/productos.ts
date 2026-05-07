import { defineStore } from 'pinia'
import datos from '../datos/info.json'

interface IProducto {
  id: string
  categoria: string
  modelo: string
  descripcion: string
  imagen: string
  color?: string
  plantilla?: string
  perfiles?: string
  detalles?: Array<{ titulo: string; valor: string }>
  especificaciones?: Array<{ icono: string; titulo: string; valor: string }>
}

interface Estado {
  productos: IProducto[]
  productoSeleccionado: IProducto | null
}

export const useAlmacenProductos = defineStore('productos', {
  state: (): Estado => ({
    productos: datos as IProducto[],
    productoSeleccionado: null,
  }),

  getters: {
    porCategoria: (estado) => (categoria: string) =>
      estado.productos.filter((p) => p.categoria === categoria),
  },

  actions: {
    cargarProductos() {
      this.productos = datos as IProducto[]
    },
    seleccionarProducto(id: string) {
      this.productoSeleccionado = this.productos.find((p) => p.id === id) || null
    },
    limpiarSeleccion() {
      this.productoSeleccionado = null
    },
  },
})
