<template lang="pug">
jdVista
  template(v-slot:encabezado)
    jdLogo

  .contenido
    jdTexto.titular ¡CONOCE TODO LO QUE #[BR] TENEMOS PARA TI!
    figure.logo-ipesa
      img(src="/img/logo-ipesa.png")
    jdBoton.btn-empezar(
      @accion="seccion('menu')"
    ) ¡EMPECEMOS!

  template(v-slot:pie)
    jdBotonQR

  template(v-slot:fondo)
    img(src="/img/fondo-01.jpg")
</template>

<script setup lang="ts">
import jdVista from '@jd/JDVista.vue';
import jdBoton from '@jd/JDBoton.vue';
import JDBotonBrillo from '@jd/JDBotonBrillo.vue';
import jdBotonInicio from '@jd/JDBotonInicio.vue';
import jdLogo from '@jd/JDLogo.vue';
import jdTexto from '@jd/JDTexto.vue';
import jdBotonQR from '@jd/JDBotonQR.vue';
import usarNavegacion from '@utiles/navegacion';

const { seccion } = usarNavegacion();
</script>

<style lang="stylus" scoped>

.contenido
  display flex
  flex-direction column
  justify-content center
  align-items center
  gap: vh(48px)

.titular
  text-align center
  font-size: vh(34px)
  font-weight: 900
  color: #fcb515
  margin-bottom: vh(180px)
  &:first-line
    font-size: vh(48px)
    color white

.logo-ipesa
  img
    width auto
    height: vh(190px)


.btn-empezar
  align-self center
  margin-inline auto
  margin-top: vh(32px)

</style>
