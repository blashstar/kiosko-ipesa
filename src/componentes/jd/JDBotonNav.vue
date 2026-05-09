<template lang="pug">
BotonTactil.jd_boton(
  @accion="emit('accion')"
  :estadoPresionado="botonPresionado"
)
  img(
    :src="rutaImagen"
    :alt="direccionActual"
    :style="estiloRotacion"
  )
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BotonTactil from '@comun/BotonTactil.vue';

const props = defineProps<{
  direccion?: 'este' | 'oeste' | 'norte' | 'sur';
}>();

const emit = defineEmits<{
  accion: [];
}>();

const direccionActual = computed(() => props.direccion || 'oeste');

const rutaImagen = computed(() => {
  if (direccionActual.value === 'este') return '/img/chevron-este.svg';
  return '/img/chevron-oeste.svg';
});

const estiloRotacion = computed(() => {
  const rotaciones: Record<string, string> = {
    oeste: '0deg',
    este: '0deg',
    norte: '90deg',
    sur: '-90deg',
  };
  return { transform: `rotate(${rotaciones[direccionActual.value]})` };
});

const botonPresionado = {
  clase: 'jd_boton--presionado',
};
</script>

<style lang="stylus" scoped>
.jd_boton
  display grid
  place-items center
  width vh(72px)
  aspect-ratio 1 / 1

  &--presionado
    color #FFCC00
    transform scale(0.9)
    filter drop-shadow(0 0 5px #FFCC00)
</style>
