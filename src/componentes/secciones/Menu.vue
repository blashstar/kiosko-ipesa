<template lang="pug">
KioskoEscena
  .titulo-menu SELECCIONA UNA OPCIÓN
  .opciones-menu
    BotonTactil.opcion(
      @accion="irAVistas360"
      :estadoPresionado="estilosOpcion"
    )
      .icono 📷
      .texto VISTAS 360°
    BotonTactil.opcion(
      @accion="irAInfografias"
      :estadoPresionado="estilosOpcion"
    )
      .icono 📊
      .texto INFOGRAFÍAS
    BotonTactil.opcion(
      @accion="irAComparativas"
      :estadoPresionado="estilosOpcion"
    )
      .icono ⚖️
      .texto COMPARATIVAS
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import KioskoEscena from '../comun/KioskoEscena.vue';
import BotonTactil from '../comun/BotonTactil.vue';

const router = useRouter();

const estilosOpcion = {
  clase: 'opcion--presionada',
  estilo: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderColor: '#00ff88',
    transform: 'scale(0.98)',
  },
};

function irAVistas360() {
  router.push({ name: 'menu-vistas-360' });
}

function irAInfografias() {
  router.push({ name: 'menu-infografias' });
}

function irAComparativas() {
  router.push({ name: 'menu-comparativas' });
}
</script>

<style lang="stylus" scoped>
.titulo-menu
  font-size 1.5rem
  margin-bottom 3rem
  color #00ff88

.opciones-menu
  display flex
  flex-direction column
  gap 2rem

.opcion
  display flex
  align-items center
  gap 1.5rem
  padding 1.5rem 3rem
  border 2px solid #333
  background rgba(255, 255, 255, 0.05)
  min-width 300px

  &--presionada
    background rgba(0, 255, 136, 0.1)
    border-color #00ff88
    transform scale(0.98)

.icono
  font-size 2rem

.texto
  font-size 1.3rem
</style>
