<template lang="pug">
JDVista
  template(v-slot:encabezado)
    JDLogo
    JDLogoSeccion(seccion="infografias")

  .contenido(v-if="infografiaActual" :class="infografiaActual.id", :style="estilos")
    figure.logo: img(:src="infografiaActual.logo")
    .visor
      .detalles
        .detalle(v-for="detalle in infografiaActual.detalles")
          .detalle__titulo {{detalle.titulo}}
          .detalle__valor {{detalle.valor}}
      .imagen: img(:src="infografiaActual.imagen" :alt="infografiaActual.modelo")

      .caracteristicas
        .mensaje EXPLORA LOS DETALLES DE TU MAQUINARIA, DA CLICK
        .caracteristica(v-for="caracteristicas in infografiaActual.caracteristicas")
          img.icono(src="https://placehold.co/120")
          JDBotonImagen(imag)
        .terminal



    .datos
      .descripcion
        JDMarkDown.texto(:markdown="infografiaActual.descripcion")
        figure.perfil
          img(:src="infografiaActual.perfiles")

      .especificaciones
        .especificacion(v-for="especificacion in infografiaActual.especificaciones")
          figure.icono: img(src="https://placehold.co/120")
          .texto
            .titulo {{especificacion.titulo}}
            .valor {{especificacion.valor}}


  //- pre {{infografiaActual}}

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
import { computed } from 'vue';
import JDVista from '@jd/JDVista.vue';
import JDLogo from '@jd/JDLogo.vue';
import JDLogoSeccion from '@jd/JDLogoSeccion.vue';
import JDTitulo from '@jd/JDTitulo.vue';
import JDBotonQR from '@jd/JDBotonQR.vue';
import JDBotonVolver from '@jd/JDBotonVolver.vue';
import JDBotonInicio from '@jd/JDBotonInicio.vue';
import JDMarkDown from '@jd/JDMarkDown.vue';
import { useAlmacenInfografias } from '@/almacenes/infografias';

const almacenInfografias = useAlmacenInfografias();
const { infografiaActual } = storeToRefs(almacenInfografias);

const estilos = computed(() => {
  return {
    '--color': infografiaActual.value?.color || '#FCB515',
  };
});


</script>

<style lang="stylus" scoped>
.contenido
  flex 1
  display flex
  flex-direction column
  align-items center
  justify-content center
  gap 2rem
  --color #FFFFFF

  .logo
    margin-inline vw(74px)
    align-self start

  .visor
    width 100%
    position relative

  .detalles
    position absolute
    background: linear-gradient(90deg, transparent 0%, var(--color));
    mix-blend-mode: plus-lighter;
    padding vh(32px) vw(96px)
    display flex
    gap vw(20px)
    z-index 1

  .detalle
    font-weight: 900;
    font-size: vh(40px);
    text-align: center;

    color: #FFFFFF;

    text-shadow: 3px 6px 4px rgba(0, 0, 0, 0.5);
    position relative
    line-height 1.2

    + .detalle
      padding-left vw(20px)
      &::before
        content ""
        display block
        width 2px
        height 100%
        background-color white;
        position absolute
        top: 0
        left 0
        bottom 0
        box-shadow: 3px 6px 4px rgba(0, 0, 0, 0.5);

  .imagen
    width 100%
    position relative
    z-index 2
    padding-inline vw(64px)

    img
      width 100%

  .caracteristicas
    display flex
    gap vw(16px) vw(40px)
    align-items center
    padding-block vh(8px) vh(48px)
    margin vh(8px) vw(72px)
    flex-wrap wrap
    border-bottom 3px solid #FCB515

    .mensaje
      flex 0 1 100%
      font-size vh(26px)
      font-weight: 900;

    .terminal
      height 3px
      background #FCB515
      flex 1 0 auto
      margin-right vw(40px)
      position relative

      &::before
        content ""
        display block
        width vw(21px)
        aspect-ratio 1
        background #FCB515
        transform translateY(-50%)
        position absolute
        top 50%
        left 0
        border-radius 100%

      &::after
        content ""
        display block
        width 3px
        height vh(240px)
        background #FCB515
        position absolute
        bottom 0
        right 0


  .datos
    padding vh(17px) vw(72px)

    .descripcion
      display flex
      gap 1rem
      align-items center

      .texto
        flex 1 1 auto
        font-weight 500
        font-size: vh(20px)
        word-break: keep-all;
        text-wrap: balance;

        :deep()
          p
            font-size inherit
            text-align left

          strong
            color var(--color)
            font-weight bold


      .perfil
        flex 1 0 auto

    .especificaciones
      margin vh(56px) 0
      display flex
      align-items center
      gap vw(24px)

    .especificacion
      flex 1 1 auto
      display flex
      align-items center
      gap vw(24px)

      .icono
        width vw(80px)

      .titulo
        font-size vh(24px)
        text-wrap balance

      .valor
        font-size vh(20px)






.E350P
  .detalles
    top 0
    left 0
    // padding-right vw(1px)

  .imagen
    margin-top vh(-120px)
    padding-left vw(120px)

.R320P
  .detalles
    top 0
    left 0

  .imagen
    margin-top vh(-96px)
    padding-left vw(96px)

.CF644G
  margin-top vh(12px)
  .detalles
    top 0
    left 0

  .imagen
    margin-top vh(-24px)
    padding-left vw(120px)

.TT850J
  .visor
    margin-top vh(24px)
  .detalles
    top 0
    right 0
    background: linear-gradient(90deg, var(--color), transparent);

  .imagen
    margin-top vh(0)
    padding-left vw(48px)

.M620G
  .visor
    margin-top vh(48px)

  .detalles
    top 0
    right 0
    background: linear-gradient(90deg, var(--color), transparent);
    padding-left vw(240px)

  .detalle
    font-size: vh(24px);

  .imagen
    margin-top vh(-48px)
    padding-left vw(48px)


.CHHC110
  .visor
    margin-top vh(48px)
  .detalles
    top 0
    left 0
    padding-right vw(140px)

  .detalle
    font-size: vh(28px);
    font-weight 600

  .imagen
    margin-top vh(-96px)
    padding-left vw(160px)

</style>
