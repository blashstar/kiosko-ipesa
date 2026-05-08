<template lang="pug">
KioskoEscena
  .encabezado
    BotonTactil.btn-volver(
      @accion="volver"
      :estadoPresionado="estilosBoton"
    ) ← VOLVER
    .titulo {{ infografiaActual?.titulo || 'INFOGRAFÍA' }}
  .contenido
    img(
      :src="infografiaActual?.imagen",
      :alt="infografiaActual?.titulo",
      v-if="infografiaActual"
    )
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAlmacenContenidos } from '@/almacenes/contenidos';
import KioskoEscena from '../comun/KioskoEscena.vue';
import BotonTactil from '../comun/BotonTactil.vue';

const router = useRouter();
const almacenContenidos = useAlmacenContenidos();
const { infografiaActual } = storeToRefs(almacenContenidos);

const estilosBoton = {
  clase: 'btn-volver--presionado',
  estilo: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    transform: 'scale(0.95)',
  },
};

function volver() {
  router.push({ name: 'menu-infografias' });
}
</script>

<style lang="stylus" scoped>
.encabezado
  display flex
  align-items center
  gap 2rem
  margin-bottom 2rem

.btn-volver
  padding 0.8rem 1.5rem
  border 1px solid #00ff88
  color #00ff88
  font-size 1rem

  &--presionado
    background rgba(0, 255, 136, 0.1)
    transform scale(0.95)

.titulo
  font-size 1.8rem
  color #00ff88

.contenido
  flex 1
  display flex
  align-items center
  justify-content center

  img
    max-width 100%
    max-height 100%
    object-fit contain
</style>
