<template lang="pug">
figure.jd_logoSeccion
    img(:src="logoActual")
</template>



<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  seccion: string;
}>();

const logos = {
  'vistas-360': '/img/icono-vistas-360.webp',
  'infografias': '/img/icono-infografia.webp',
  'versus': '/img/icono-versus.webp'
};

const gif1px = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

const logoActual = computed(() => logos[props.seccion] || 'gif1px');


</script>

<style lang="stylus" scoped>

.jd_logoSeccion
	margin-inline vh(64px)
	img
		display block

</style>
