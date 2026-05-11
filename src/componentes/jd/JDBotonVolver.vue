<template lang="pug">
	JDBotonBrillo.jd_boton_volver(@accion="volver()")
		img(src="/img/boton-volver.svg")
</template>

<script setup lang="ts">
import JDBotonBrillo from '@jd/JDBotonBrillo.vue';
import usarNavegacion from '@utiles/navegacion';

const { volver } = usarNavegacion();
</script>

<style lang="stylus">
.jd_boton_volver
	img
		transform scale(0.85)
</style>
