<template lang="pug">
.kiosko(ref="kioskoElemento", :class="{ 'kiosko--depurar': depurar, 'cursor-oculto': !mostrarCursor }")
  .kiosko__aplicacion(:class="claseBarras")
    slot
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usarObservadorRedimension } from '@utiles/observadorRedimension'
import { leerDimensiones, extraerDimensiones } from '@utiles/orientacion/extractores'
import { calcularRatio } from '@utiles/orientacion/logica'
import { useAlmacenInterfaz } from '@/almacenes/interfaz'

const props = defineProps<{
  depurar?: boolean
}>()

const almacenInterfaz = useAlmacenInterfaz()
const { mostrarCursor } = storeToRefs(almacenInterfaz)

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

function alPresionarTecla(evento: KeyboardEvent) {
  if (evento.key === 'c' || evento.key === 'C') {
    almacenInterfaz.alternarCursor()
  }
}

let detenerObserver: (() => void) | undefined

onMounted(() => {
	if (kioskoElemento.value) {
		detenerObserver = usarObservadorRedimension(kioskoElemento.value, alRedimensionar)
	}
  window.addEventListener('keydown', alPresionarTecla)
})

onBeforeUnmount(() => {
  detenerObserver?.()
  window.removeEventListener('keydown', alPresionarTecla)
})
</script>


