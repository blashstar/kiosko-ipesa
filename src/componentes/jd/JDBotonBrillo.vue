<template lang="pug">
	BotonTactil.jd_boton_brillo(
		@accion="emit('accion')"
		:estadoPresionado="botonPresionado"
	)
		svg(aria-hidden="true" width="0" height="0" style="position: absolute; visibility: hidden")
			defs
				filter#brillo(x="-50%" y="-50%" width="200%" height="200%")
					feGaussianBlur(in="SourceAlpha" stdDeviation="3" result="blur")
					feFlood(in="SourceGraphic" flood-color="#FFD700" flood-opacity="0.9" result="yellow")
					feComposite(in="yellow" in2="blur" operator="in" result="glow")

					feMerge
						feMergeNode(in="glow")
						feMergeNode(in="SourceGraphic")

		.jd_boton_brillo__contenido: slot

</template>

<script setup lang="ts">
import BotonTactil from '@comun/BotonTactil.vue';

const emit = defineEmits<{
  accion: [];
}>();

const botonPresionado = {
  clase: 'jd_boton_brillo--presionado',
};

</script>

<style lang="stylus" scoped>

.jd_boton_brillo
	box-sizing border-box
	width vh(100px)
	height vh(100px)
	aspect-ratio 1 / 1
	border none
	border-radius 50%
	background transparent
	padding 0
	display grid
	place-items stretch
	place-content stretch
	filter: url(#brillo)
	transition all 0.2s ease

	&--presionado
		transform scale(0.9)
		box-shadow 0 0 20px #FFD700

	&__contenido
		max-width 100%
		max-height 100%
		display grid
		place-items center

		:deep(img)
			display block
			width 100%
			height 100%
			justify-self stretch
			align-self stretch

</style>
