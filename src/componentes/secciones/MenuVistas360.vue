<template lang="pug">
KioskoEscena
  .encabezado
    BotonTactil.btn-volver(
      @accion="volver"
      :estadoPresionado="estilosBoton"
    ) ← VOLVER
    .titulo VISTAS 360°
  .lista-items
    BotonTactil.item(
      v-for="vista in vistas"
      :key="vista.id"
      @accion="seleccionarVista(vista)"
      :estadoPresionado="estilosItem"
    )
      .imagen-item
        img(:src="vista.miniatura" :alt="vista.nombre")
      .nombre-item {{ vista.nombre }}
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAlmacenVistas360 } from '@/almacenes/vistas360';
import KioskoEscena from '../comun/KioskoEscena.vue';
import BotonTactil from '../comun/BotonTactil.vue';

const router = useRouter();
const almacenVistas360 = useAlmacenVistas360();
const { vistas } = storeToRefs(almacenVistas360);

const estilosBoton = {
  clase: 'btn-volver--presionado',
  estilo: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    transform: 'scale(0.95)',
  },
};

const estilosItem = {
  clase: 'item--presionado',
  estilo: {
    borderColor: '#00ff88',
    transform: 'scale(1.02)',
  },
};

function seleccionarVista(vista: any) {
  almacenVistas360.seleccionarVista(vista.id);
  router.push({ name: 'vista-360' });
}

function volver() {
  router.push({ name: 'menu' });
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

.lista-items
  display grid
  grid-template-columns repeat(auto-fill, minmax(200px, 1fr))
  gap 2rem
  overflow-y auto
  flex 1

.item
  display flex
  flex-direction column
  align-items center
  padding 1rem
  border 1px solid #333

  &--presionado
    border-color #00ff88
    transform scale(1.02)

.imagen-item img
  width 100%
  aspect-ratio 1
  object-fit cover

.nombre-item
  margin-top 0.5rem
  font-size 1rem
  text-align center
</style>
