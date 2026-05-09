<template lang="pug">
button.boton-tactil(
  :class="clases"
  :disabled="deshabilitado"
  :style="estilos"
  @mousedown="alPresionar"
  @mouseup="alSoltar"
  @mouseleave="alAbandonar"
  @touchstart.passive="alPresionar"
  @touchend.prevent="alSoltar"
  @touchcancel="alAbandonar"
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usarBotonTactil } from './useBotonTactil';

interface EstadoPresionado {
  clase?: string;
  estilo?: Record<string, string | number>;
}

interface Props {
  deshabilitado?: boolean;
  estadoPresionado?: EstadoPresionado;
}

const props = withDefaults(defineProps<Props>(), {
  deshabilitado: false,
  estadoPresionado: () => ({}),
});

const emit = defineEmits<{
  accion: [];
}>();

const { presionado, escala, duracionMs, alPresionar, alSoltar, alAbandonar } = usarBotonTactil({
  onAccion: () => emit('accion'),
});

const clases = computed(() => ({
  'boton-tactil--presionado': presionado.value,
  [props.estadoPresionado.clase]: presionado.value && props.estadoPresionado.clase,
}));

const estilos = computed(() => {
  if (!presionado.value || !props.estadoPresionado.estilo) return {};
  return {
    ...props.estadoPresionado.estilo,
  };
});
</script>

<style lang="stylus" scoped>
.boton-tactil
    user-select none
    -webkit-tap-highlight-color transparent
    touch-action manipulation
    transition all 0.1s ease-in-out
</style>
