<template lang="pug">
KioskoEscena
  .encabezado
    BotonTactil.btn-volver(
      @accion="volver"
      :estadoPresionado="estilosBoton"
    ) ← VOLVER
    .titulo {{ comparativaActual?.titulo || 'COMPARATIVA' }}
  .contenido
    .productos(v-if="comparativaActual")
      .producto
        img(
          :src="comparativaActual.producto1.imagen",
          :alt="comparativaActual.producto1.nombre"
        )
        .nombre {{ comparativaActual.producto1.nombre }}
      .vs VS
      .producto
        img(
          :src="comparativaActual.producto2.imagen",
          :alt="comparativaActual.producto2.nombre"
        )
        .nombre {{ comparativaActual.producto2.nombre }}
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAlmacenComparativas } from '@/almacenes/comparativas';
import KioskoEscena from '../comun/KioskoEscena.vue';
import BotonTactil from '../comun/BotonTactil.vue';

const router = useRouter();
const almacenComparativas = useAlmacenComparativas();
const { comparativaActual } = storeToRefs(almacenComparativas);

const estilosBoton = {
  clase: 'btn-volver--presionado',
  estilo: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    transform: 'scale(0.95)',
  },
};

function volver() {
  router.push({ name: 'menu-comparativas' });
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
  gap 4rem

.productos
  display flex
  align-items center
  gap 4rem

.producto
  display flex
  flex-direction column
  align-items center

  img
    max-width 400px
    object-fit contain

  .nombre
    margin-top 1rem
    font-size 1.2rem

.vs
  font-size 2rem
  color #00ff88
  font-weight bold
</style>
