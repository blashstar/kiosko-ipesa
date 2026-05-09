<template lang="pug">
	JDBotonBrillo(@accion="seccion('inicio')")
		img(src="/img/boton-inicio.svg")
</template>

<script setup lang="ts">
import JDBotonBrillo from '@jd/JDBotonBrillo.vue';
import usarNavegacion from '@utiles/navegacion';

const { seccion } = usarNavegacion();
</script>
