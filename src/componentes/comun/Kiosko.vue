<template lang="pug">
.kiosko(ref="kioskoElemento")
  .kiosko__aplicacion(:class="claseBarras")
    slot
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { usarObservadorRedimension } from '@utiles/observadorRedimension'
import { leerDimensiones, extraerDimensiones } from '@utiles/orientacion/extractores'
import { calcularRatio } from '@utiles/orientacion/logica'


const kioskoElemento = ref<HTMLElement | null>(null)
const claseBarras = ref<string>('')

function alRedimensionar(entrada: ResizeObserverEntry) {
	const { ancho, alto } = leerDimensiones(kioskoElemento.value);
	const relacionAspecto = calcularRatio(ancho, alto);

	const { ancho:anchoArea, alto:altoArea } = extraerDimensiones(entrada, kioskoElemento);
	const relacionArea = calcularRatio(anchoArea, altoArea);

	if (relacionArea < relacionAspecto) {
		claseBarras.value = 'kiosko__aplicacion--hBarras';
	} else if (relacionArea > relacionAspecto) {
		claseBarras.value = 'kiosko__aplicacion--vBarras';
	} else {
		claseBarras.value = '';
	}

}

let detenerObserver: (() => void) | undefined

onMounted(() => {
	if (kioskoElemento.value) {
		detenerObserver = usarObservadorRedimension(kioskoElemento.value, alRedimensionar)
	}
})

onBeforeUnmount(() => {
  detenerObserver?.()
})
</script>

<style lang="stylus">

.kiosko

  // Dimensiones y layout principal
  width 100vw
  height 100vh
  max-width 100dvw
  max-height 100dvh
  overflow hidden
  background-color var(--kiosko-color-fondo)
  color var(--kiosko-color-texto)
  display grid
  place-content stretch
  place-items center

  // Aspect‑ratio classes
  &.aspect-wide
    --kiosko-escala 1.1
  &.aspect-tall
    --kiosko-escala 0.9

  // Modo depuración - muestra bordes en todos los elementos kiosko__
  &--depurar
    [class*="kiosko__"]
      outline var(--kiosko-debug-outline-thick)
      *
        outline var(--kiosko-debug-outline-thin)

  // Reset de márgenes y tipografía base
  h1, h2, h3, h4, h5, h6
    margin 0
    line-height 1.2
    text-wrap balance
  p
    margin 0
    line-height 1.5

  // Contenedor de la aplicación principal
  &__aplicacion
    position relative
    aspect-ratio var(--kiosko-relacion-aspecto)
    margin auto
    transform scale(var(--kiosko-escala))
    width 100vw
    height 100vh
    max-height 100dvh
    max-width 100dvw
    display grid
    place-content stretch
    place-items center
    overflow-y auto
    > *
      grid-area 1 / 1

    // Tipografía responsive relativa al viewport
    h1
      font-size var(--kiosko-h1-tamano)
    h2
      font-size var(--kiosko-h2-tamano)
    h3
      font-size var(--kiosko-h3-tamano)
    h4
      font-size var(--kiosko-h4-tamano)
    h5
      font-size var(--kiosko-h5-tamano)
    h6
      font-size var(--kiosko-h6-tamano)
    p
      font-size var(--kiosko-body-tamano)
    small
      font-size var(--kiosko-small-tamano)

  h1, h2, h3, h4, h5, h6
    margin 0
    line-height 1.2
    text-wrap balance
  p
    margin 0
    line-height 1.5

  // Contenedor de la aplicación principal
  &__aplicacion
    position relative
    aspect-ratio var(--kiosko-relacion-aspecto)
    margin auto
    transform scale(var(--kiosko-escala))
    width 100vw
    height 100vh
    max-height 100dvh
    max-width 100dvw
    display grid
    place-content stretch
    place-items center
    overflow-y auto

    // Todos los hijos ocupan la misma área de la cuadrícula
    > *
      grid-area 1 / 1

    // Tipografía responsive relativa al viewport
    h1
      font-size var(--kiosko-h1-tamano)
    h2
      font-size var(--kiosko-h2-tamano)
    h3
      font-size var(--kiosko-h3-tamano)
    h4
      font-size var(--kiosko-h4-tamano)
    h5
      font-size var(--kiosko-h5-tamano)
    h6
      font-size var(--kiosko-h6-tamano)
    p
      font-size var(--kiosko-body-tamano)
    small
      font-size var(--kiosko-small-tamano)

    // Modificadores para letterboxing
    // --vBarras: contenedor más estrecho que el ideal (ratio < ideal)
    // --hBarras: contenedor más ancho que el ideal (ratio > ideal)
    &--vBarras
      height 100vh
      max-height 100dvh
      width auto

    &--hBarras
      width 100vw
      max-width 100dvw
      height auto
      max-height none

    // Modo scroll cuando el viewport es menor al 50% del ideal
    // Se anula el aspect-ratio y se habilita scroll vertical
    // Va al final para ganar en cascada si coexistiera con letterboxing
    &--scroll
      aspect-ratio auto
      place-items start
</style>
