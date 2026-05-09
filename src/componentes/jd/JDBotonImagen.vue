<template lang="pug">
	BotonTactil.jd_boton_imagen(
		@accion="emit('accion')"
		:estadoPresionado="botonPresionado"
	)
		figure.jd_boton_imagen__contenido
			img(:src="imagen")

</template>

<script setup lang="ts">
import BotonTactil from '@comun/BotonTactil.vue';

const props = withDefaults(defineProps<{
  imagen?: string;
}>(), {
  imagen: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
});

const emit = defineEmits<{
  accion: [];
}>();

const botonPresionado = {
  clase: 'jd_boton_imagen--presionado',
};

</script>

<style lang="stylus" scoped>

.jd_boton_imagen
	box-sizing border-box
	border none
	background transparent
	padding 0
	display grid
	place-items stretch
	place-content stretch
	transition all 0.2s ease

	&--presionado
		//

	&__contenido
		max-width 100%
		max-height 100%
		display grid
		place-items center
		transition all 0.2s ease

		^[0]--presionado &
			transform scale(0.9)
			filter: drop-shadow(0 0 10px #FFD700)

</style>
