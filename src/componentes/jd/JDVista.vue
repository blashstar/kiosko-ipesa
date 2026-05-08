<template lang="pug">
KioskoEscena
	.encabezado(v-if="ranuras.encabezado"): slot(name="encabezado")
	.contenido: slot
	.pie(v-if="ranuras.pie"): slot(name="pie")

	template(v-slot:fondo, v-if="ranuras.fondo")
		slot(name="fondo")
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue';
import KioskoEscena from '@comun/KioskoEscena.vue';
import { useContenidoSlot } from '@utiles/ranuras';

const ranuras = useContenidoSlot(['encabezado', 'pie', 'fondo']);

</script>

<style lang="stylus" scoped>


.encabezado
  display flex
  justify-content end
  flex-direction row-reverse
  align-items center
  padding-block vh(96px) vh(32px)


.contenido
  flex 1 1 auto
</style>
