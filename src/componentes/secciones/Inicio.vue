<template lang="pug">
JDVista
  template(v-slot:encabezado)
    JDLogo

  .contenido
    JDTexto.titular ¡CONOCE TODO LO QUE #[BR] TENEMOS PARA TI!
    figure.logo-ipesa
      img(src="/img/logo-ipesa.png")
    JDBoton.btn-empezar(
      @accion="seccion('menu')"
    ) ¡EMPECEMOS!

  template(v-slot:pie)
    JDBotonQR

  template(v-slot:fondo)
    img(src="/img/fondo-01.jpg")
</template>

<script setup lang="ts">
import JDVista from '@jd/JDVista.vue';
import JDBoton from '@jd/JDBoton.vue';
import JDBotonBrillo from '@jd/JDBotonBrillo.vue';
import JDBotonInicio from '@jd/JDBotonInicio.vue';
import JDLogo from '@jd/JDLogo.vue';
import JDTexto from '@jd/JDTexto.vue';
import JDBotonQR from '@jd/JDBotonQR.vue';
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
