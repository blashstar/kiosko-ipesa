<template lang="pug">
.kiosko__escena
  .kiosko__escena__capa.kiosko__escena__capa--fondo(v-if="ranuras.fondo")
    slot(name="fondo")
  .kiosko__escena__capa.kiosko__escena__capa--contenido
    slot
</template>

<script setup lang="ts">

import { useContenidoSlot } from '@utiles/ranuras';

const ranuras = useContenidoSlot(['fondo']);
</script>


<style lang="stylus">


.kiosko
  &__escena
    width 100%
    height 100%
    display: grid
    place-content: stretch
    place-items: stretch
    position: relative

    &__capa
      grid-area: 1 / 1

      &--fondo
        z-index -1
        display: grid
        place-content: stretch
        place-items: stretch
        position: relative

        img, video
          width 100%
          height 100%
          object-fit cover
          min-width: 100%
          min-height: 100%

      &--contenido
        z-index 1
        display: flex
        flex-direction: column
        gap 0
        overflow-y visible

</style>
