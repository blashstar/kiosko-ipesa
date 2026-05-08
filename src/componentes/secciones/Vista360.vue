<template lang="pug">
KioskoEscena
  .encabezado
    BotonTactil.btn-volver(
      @accion="volver"
      :estadoPresionado="estilosBoton"
    ) ← VOLVER
    .titulo {{ vistaActual?.nombre || 'VISTA 360°' }}
  .visor
    Visor360(
      v-if="vistaActual",
      :imagenes="vistaActual.imagenes",
      :configuracion="vistaActual.configuracion"
    )
    .cargando(v-else) Cargando...
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAlmacenVistas360 } from '@/almacenes/vistas360';
import Visor360 from '@/componentes/Visor360.vue';
import KioskoEscena from '../comun/KioskoEscena.vue';
import BotonTactil from '../comun/BotonTactil.vue';

const router = useRouter();
const almacenVistas360 = useAlmacenVistas360();
const { vistaActual } = storeToRefs(almacenVistas360);

const estilosBoton = {
  clase: 'btn-volver--presionado',
  estilo: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    transform: 'scale(0.95)',
  },
};

function volver() {
  router.push({ name: 'menu-vistas-360' });
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

.visor
  flex 1
  display flex
  align-items center
  justify-content center

.cargando
  color #666
</style>
