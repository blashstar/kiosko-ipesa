<template lang="pug">
jdVista
  template(v-slot:encabezado)
    jdLogo.logo

  jdBoton.btn-iniciar(
    @accion="seccion('menu')"
  ) TOCA PARA INICIAR

  template(v-slot:fondo)
    img(src="/img/fondo-01.jpg")
</template>

<script setup lang="ts">
import jdVista from '@jd/JDVista.vue';
import jdLogo from '@jd/JDLogo.vue';
import jdBoton from '@jd/JDBoton.vue';
import usarNavegacion from '@utiles/navegacion';

const { seccion } = usarNavegacion();

</script>

<style lang="stylus" scoped>
</style>
