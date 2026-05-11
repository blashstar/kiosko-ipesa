<template lang="pug">
JDVista
  template(v-slot:encabezado)
    JDLogo
    JDLogoSeccion(seccion="infografias")

  .contenido(v-if="infografiaActual")
    JDTitulo.titulo {{ infografiaActual.modelo }}
    img(:src="`/img/modelos/${infografiaActual.imagen}`" :alt="infografiaActual.modelo")

  template(v-slot:pie)
    JDBotonQR
    .grupo
      JDBotonVolver
      JDBotonInicio

  template(v-slot:fondo)
    img(src="/img/fondo-02.jpg")
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import JDVista from '@jd/JDVista.vue';
import JDLogo from '@jd/JDLogo.vue';
import JDLogoSeccion from '@jd/JDLogoSeccion.vue';
import JDTitulo from '@jd/JDTitulo.vue';
import JDBotonQR from '@jd/JDBotonQR.vue';
import JDBotonVolver from '@jd/JDBotonVolver.vue';
import JDBotonInicio from '@jd/JDBotonInicio.vue';
import { useAlmacenInfografias } from '@/almacenes/infografias';

const almacenInfografias = useAlmacenInfografias();
const { infografiaActual } = storeToRefs(almacenInfografias);
</script>

<style lang="stylus" scoped>
.contenido
  flex 1
  display flex
  flex-direction column
  align-items center
  justify-content center
  gap 2rem

  img
    max-width 90%
    max-height 70vh
    object-fit contain
</style>
