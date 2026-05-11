<template lang="pug">
.visor-360
  .contenedor-imagenes
    img(
      v-for="(imagen, indice) in imagenes",
      :key="indice",
      :src="imagen",
      :alt="`Imagen ${indice + 1}`",
      :class="{ activa: indice === indiceActual }"
    )
  .indicador-indice {{ indiceActual + 1 }} / {{ imagenes.length }}
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  imagenes: string[]
  configuracion?: {
    velocidad?: number
    sensibilidad?: number
  }
}>()

const indiceActual = ref(0)
const estaArrastrando = ref(false)
const posicionInicial = ref(0)
const ultimoIndice = ref(0)
const velocidad = props.configuracion?.velocidad || 50
const sensibilidad = props.configuracion?.sensibilidad || 0.3

function manejarMouseDown(e: MouseEvent) {
  estaArrastrando.value = true
  posicionInicial.value = e.clientX
}

function manejarMouseMove(e: MouseEvent) {
  if (!estaArrastrando.value) return

  const delta = e.clientX - posicionInicial.value
  const cambio = Math.floor(Math.abs(delta) / sensibilidad)

  if (cambio >= 1) {
    const direccion = delta > 0 ? 1 : -1
    const nuevoIndice = indiceActual.value + direccion * cambio

    if (nuevoIndice !== ultimoIndice.value) {
      if (nuevoIndice >= 0 && nuevoIndice < props.imagenes.length) {
        indiceActual.value = nuevoIndice
      } else if (nuevoIndice < 0) {
        indiceActual.value = props.imagenes.length - 1
      } else if (nuevoIndice >= props.imagenes.length) {
        indiceActual.value = 0
      }
      ultimoIndice.value = indiceActual.value
      posicionInicial.value = e.clientX
    }
  }
}

function manejarMouseUp() {
  estaArrastrando.value = false
}

function manejarTouchStart(e: TouchEvent) {
  estaArrastrando.value = true
  posicionInicial.value = e.touches[0].clientX
}

function manejarTouchMove(e: TouchEvent) {
  if (!estaArrastrando.value) return
  e.preventDefault()

  const delta = e.touches[0].clientX - posicionInicial.value
  const cambio = Math.floor(Math.abs(delta) / sensibilidad)

  if (cambio >= 1) {
    const direccion = delta > 0 ? 1 : -1
    const nuevoIndice = indiceActual.value + direccion * cambio

    if (nuevoIndice !== ultimoIndice.value) {
      if (nuevoIndice >= 0 && nuevoIndice < props.imagenes.length) {
        indiceActual.value = nuevoIndice
      } else if (nuevoIndice < 0) {
        indiceActual.value = props.imagenes.length - 1
      } else if (nuevoIndice >= props.imagenes.length) {
        indiceActual.value = 0
      }
      ultimoIndice.value = indiceActual.value
      posicionInicial.value = e.touches[0].clientX
    }
  }
}

function manejarTouchEnd() {
  estaArrastrando.value = false
}

onMounted(() => {
  window.addEventListener('mouseup', manejarMouseUp)
  window.addEventListener('touchend', manejarTouchEnd)
})

onUnmounted(() => {
  window.removeEventListener('mouseup', manejarMouseUp)
  window.removeEventListener('touchend', manejarTouchEnd)
})
</script>

<style lang="stylus" scoped>
.visor-360
  width: 100%
  height: 100%
  position: relative
  overflow: hidden
  cursor grab

  &:active
    cursor grabbing

.contenedor-imagenes
  width: 100%
  height: 100%
  position: relative

  img
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: contain
    opacity: 0
    transition: opacity 0.15s ease

    &.activa
      opacity: 1

.indicador-indice
  position: absolute
  bottom: 1rem
  right: 1rem
  background: rgba(0, 0, 0, 0.7)
  color: #fff
  padding: 0.5rem 1rem
  font-size: 0.9rem
</style>