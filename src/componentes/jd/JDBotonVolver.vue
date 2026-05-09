<template lang="pug">
	JDBotonBrillo(@accion="volver()")
		img(src="/img/boton-volver.svg")
</template>

<script setup lang="ts">
import JDBotonBrillo from '@jd/JDBotonBrillo.vue';
import usarNavegacion from '@utiles/navegacion';

const { volver } = usarNavegacion();
</script>
