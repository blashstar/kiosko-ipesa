<template lang="pug">
	.jd_boton_volver: JDBotonBrillo(@accion="volver()")
		img(src="/img/boton-volver.svg")
</template>

<script setup lang="ts">
import JDBotonBrillo from '@jd/JDBotonBrillo.vue';
import usarNavegacion from '@utiles/navegacion';

const { volver } = usarNavegacion();
</script>

<style lang="stylus">
.jd_boton_volver
	transform scale(0.85)
</style>
