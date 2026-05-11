import { ref, watch, type Ref } from 'vue'

export interface Dimensiones {
  ancho: number
  alto: number
}

/**
 * Crea un ResizeObserver que vigila un elemento y devuelve refs reactivas
 * con sus dimensiones actualizadas.
 */
export function usarObservadorResize(elemento: Ref<HTMLElement | null>) {
  const ancho = ref(0)
  const alto = ref(0)
  let observador: ResizeObserver | null = null

  const observar = (el: HTMLElement) => {
    observador = new ResizeObserver((entradas) => {
      for (const entrada of entradas) {
        ancho.value = entrada.contentRect.width
        alto.value = entrada.contentRect.height
      }
    })
    observador.observe(el)
  }

  watch(
    elemento,
    (nuevo, anterior) => {
      if (anterior && observador) {
        observador.disconnect()
        observador = null
      }
      if (nuevo) {
        observar(nuevo)
      }
    },
    { immediate: true },
  )

  return { ancho, alto }
}

/** Obtiene el valor numérico de la variable CSS --KioskoAncho. */
export function obtenerKioskoAncho(): number {
  const valor = getComputedStyle(document.documentElement)
    .getPropertyValue('--KioskoAncho')
    .trim()
  return parseFloat(valor) || 0
}

/** Obtiene el valor numérico de la variable CSS --KioskoAlto. */
export function obtenerKioskoAlto(): number {
  const valor = getComputedStyle(document.documentElement)
    .getPropertyValue('--KioskoAlto')
    .trim()
  return parseFloat(valor) || 0
}
