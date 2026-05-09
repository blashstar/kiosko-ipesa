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



