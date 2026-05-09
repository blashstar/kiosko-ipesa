<template lang="pug">
.kiosko(ref="kioskoElemento", :class="{ 'kiosko--depurar': depurar }")
  .kiosko__aplicacion(:class="claseBarras")
    slot
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { usarObservadorRedimension } from '@utiles/observadorRedimension'
import { leerDimensiones, extraerDimensiones } from '@utiles/orientacion/extractores'
import { calcularRatio } from '@utiles/orientacion/logica'

defineProps<{
  depurar?: boolean
}>()

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


