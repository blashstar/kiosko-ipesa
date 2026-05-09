<template lang="pug">
  BotonTactil.jd_boton(
    @accion="emit('accion')"
    :estadoPresionado="botonPresionado"
  ): slot

</template>

<script setup lang="ts">
import BotonTactil from '@comun/BotonTactil.vue';

const emit = defineEmits<{
  accion: [];
}>();

const botonPresionado = {
  clase: 'jd_boton--presionado',
};

</script>

<style lang="stylus" scoped>

.jd_boton
	display inline-block
	padding 1em 2em
	color white
	font-size vh(25px)
	font-weight 900
	background-color #404040
	background-image linear-gradient(to bottom right, #404040, #000000)
	border: 1px solid #FFCC00
	border-radius 10px
	user-select none
	cursor pointer
	text-align center

	&--presionado
		background-image linear-gradient(to top right, #404040, #000000);
		color #FFCC00
		transform scale(0.9)
		box-shadow 0 0 25px 15px #FFCC0066

</style>
