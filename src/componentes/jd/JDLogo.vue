<template lang="pug">
figure.jd_logo(:class="marcaActual")
	img(:src="logo" :alt="marcaActual")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAlmacenInterfaz } from '@/almacenes/interfaz';

const { marca } = storeToRefs(useAlmacenInterfaz());

const logos: Record<string, string> = {
	johndeere: '/img/logo.svg',
	hamm: '/img/logo-hamm.svg',
};

const marcaActual = computed(() => (marca.value ?? 'JohnDeere').toLowerCase())

const logo = computed(() => logos[marcaActual.value]);
</script>

<style lang="stylus" scoped>
.jd_logo
	img
		display block
		height vh(77px)

.hamm
	margin-right: vw(48px)
	img
		width: vw(260px)
</style>
