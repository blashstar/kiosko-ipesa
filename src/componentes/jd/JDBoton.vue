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
	background-color #00ff88
	color #0a0a0a
	font-size 1.5em
	border-radius 8px
	user-select none
	cursor pointer
	text-align center
	transition background-color 150ms, color 150ms, transform 150ms

	&--presionado
		background-color #00cc70
		color #0a0a0a
		transform scale(0.95)

</style>
