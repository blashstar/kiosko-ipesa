<template lang="pug">
KioskoEscena
  .jd_vista
    .jd_vista__encabezado(v-if="ranuras.encabezado"): slot(name="encabezado")
    .jd_vista__contenido: slot
    .jd_vista__pie(v-if="ranuras.pie"): slot(name="pie")

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

.jd_vista
  display grid
  grid-template-rows auto 1fr auto
  height 100%

  &__encabezado
    display flex
    justify-content space-between
    flex-direction row-reverse
    align-items center
    padding-block vh(96px) vh(32px)


  &__contenido
    // flex 1 1 auto
    display flex
    flex-direction column
    justify-content center
    align-items stretch

  &__pie
    // flex 0 1 auto
    display flex
    justify-content space-between
    align-items center
    padding vh(32px) vh(80px) vh(64px)

</style>
