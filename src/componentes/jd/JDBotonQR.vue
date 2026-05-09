<template lang="pug">
	BotonTactil.jd_boton_qr(
		@accion="seccion('qr')"
		:estadoPresionado="botonPresionado"
	)
		.jd_boton_qr__icono
			img.borde(src="/img/boton-marco.svg" )
			img.qr(src="/img/qr.svg")
		.jd_boton_qr__texto: span
			| PARA MÁS #[br]INFORMACIÓN, #[br]¡ESCANÉAME!
		svg(aria-hidden="true" width="0" height="0" style="position: absolute; visibility: hidden")
			defs
				filter#brillo(x="-50%" y="-50%" width="200%" height="200%")
					feGaussianBlur(in="SourceAlpha" stdDeviation="3" result="blur")
					feFlood(in="SourceGraphic" flood-color="#FFD700" flood-opacity="0.9" result="yellow")
					feComposite(in="yellow" in2="blur" operator="in" result="glow")

					feMerge
						feMergeNode(in="glow")
						feMergeNode(in="SourceGraphic")


</template>

<script setup lang="ts">
import BotonTactil from '@comun/BotonTactil.vue';
import usarNavegacion from '@utiles/navegacion';

const { seccion } = usarNavegacion();

const botonPresionado = {
	clase: 'jd_boton_qr--presionado',
};

</script>

<style lang="stylus" scoped>

.jd_boton_qr
	box-sizing border-box
	border none
	padding 0
	display flex
	align-items center
	gap vh(32px)
	background transparent

	&--presionado
		transform scale(0.9)
		box-shadow 0 0 20px #FFD700

	&__icono
		display grid
		place-items center
		width vh(100px)
		height vh(100px)
		aspect-ratio 1 / 1

		img
			grid-area 1 / 1
			width 100%
			height 100%
			display block

		.borde
			filter: url(#brillo)
			transition all 0.2s ease

		.qr
			width 75%
			filter invert(1) brightness(200%)

	&__texto
		width min-content
		min-width 12ch
		color white
		font-size vh(18px)
		font-weight bold
		text-align left
		line-height 1.5
		text-wrap balance


</style>
