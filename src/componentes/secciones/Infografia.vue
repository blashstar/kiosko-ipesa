<template lang="pug">
JDVista
  template(v-slot:encabezado)
    JDLogo
    JDLogoSeccion(seccion="infografias")

  .contenido(v-if="infografiaActual" :class="infografiaActual.id", :style="estilos")
    figure.logo: img(:src="infografiaActual.logo")
    .visor
      .detalles(ref="detallesRef")
        .detalle(v-for="detalle in infografiaActual.detalles")
          .detalle__titulo {{detalle.titulo}}
          .detalle__valor {{detalle.valor}}
      .imagen
        .modelo
          img(:src="infografiaActual.imagen" :alt="infografiaActual.modelo", ref="imagenRef")
          transition(name="transicion-info", mode="out-in" appear)
            .info(v-if="marcadorActivo != null", :key="marcadorActivo")
              .marca(:style="estiloMarca"): img(src="/img/triangulo.svg")
              JDPanel.panel(:style="estiloPanel")
                .titulo {{info.titulo}}
                JDMarkDown.descripcion(:markdown="info.descripcion")

      .caracteristicas(ref="caracteristicasRef")
        .mensaje EXPLORA LOS DETALLES DE TU MAQUINARIA, DA CLICK
        .caracteristica(v-for="caracteristica, idx in infografiaActual.caracteristicas")
          //- img.icono(src="https://placehold.co/120")
          JDBotonImagen.icono(:imagen="caracteristica.icono" @accion="alternarMarcador(idx)")
        .terminal



    .datos
      .descripcion
        JDMarkDown.texto(:markdown="infografiaActual.descripcion")
        figure.perfil
          img(:src="infografiaActual.perfiles")

      .especificaciones(ref="especificacionesRef")
        .especificacion(v-for="especificacion in infografiaActual.especificaciones")
          figure.icono: img(:src="especificacion.icono")
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
import { ref, computed, onUnmounted, onMounted, onActivated, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import JDVista from '@jd/JDVista.vue';
import JDLogo from '@jd/JDLogo.vue';
import JDLogoSeccion from '@jd/JDLogoSeccion.vue';
import JDTitulo from '@jd/JDTitulo.vue';
import JDBotonQR from '@jd/JDBotonQR.vue';
import JDBotonVolver from '@jd/JDBotonVolver.vue';
import JDBotonInicio from '@jd/JDBotonInicio.vue';
import JDBotonImagen from '@jd/JDBotonImagen.vue';
import JDPanel from '@jd/JDPanel.vue';
import JDMarkDown from '@jd/JDMarkDown.vue';
import { useAlmacenInfografias } from '@/almacenes/infografias';

const almacenInfografias = useAlmacenInfografias();
const { infografiaActual } = storeToRefs(almacenInfografias);

const estilos = computed(() => {
  return {
    '--color': infografiaActual.value?.color || '#FCB515',
  };
});

const detallesRef = ref<HTMLElement | null>(null);
const especificacionesRef = ref<HTMLElement | null>(null);
const caracteristicasRef = ref<HTMLElement | null>(null);
const imagenRef = ref<HTMLElement | null>(null);

const marcadorActivo = ref(null)
const info = computed(() => (infografiaActual.value?.caracteristicas[marcadorActivo?.value ?? 0]))

const direcciones = {
  N: "180deg",
  S: "0deg",
  O: "90deg",
  E: "270deg"
}


const estiloMarca = computed(() => {
  if(!info?.value?.marcador){
    return {
      display: "none"
    }
  }

  return {
    left: `${(info?.value?.marcador?.x ?? 0) * 100}%`,
    top: `${(info?.value?.marcador?.y ?? 0) * 100}%`,
    transform: `rotate(${direcciones[info?.value?.marcador?.d]})`
  }
})

const estiloPanel = computed(() => {
  if(!info?.value?.panel){
    return {}
  }

  const panel = info.value.panel
  return {
    top: panel?.top,
    bottom: panel?.bottom,
    left: panel?.left,
    right: panel?.right,
  }
})


function alternarMarcador(id:number){
  if(id == marcadorActivo.value){
    marcadorActivo.value = null;
    return;
  }

  marcadorActivo.value = id;
}

function animarEntrada() {
  nextTick(() => {
    if (detallesRef.value) {
      const elementos = detallesRef.value.querySelectorAll('.detalle');


      gsap.fromTo(detallesRef.value, {


        clipPath: 'circle(0% at 0 50%)',    // ✅ Oculto (mismo formato)
        duration: 1,
        ease: 'power2.out',
        delay: 0.1
      },{

      clipPath: 'circle(200% at 0 50%)'
      })
      gsap.from(elementos, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.5
      });
    }

    if (especificacionesRef.value) {
      const elementos = especificacionesRef.value.querySelectorAll('.especificacion');
      gsap.from(elementos, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.5,
      });
    }

    if (caracteristicasRef.value) {
      const elementos = caracteristicasRef.value.querySelectorAll('.caracteristica');
      gsap.from(elementos, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 1
      });
    }

    if (imagenRef.value) {
      // gsap.set(imagenRef.value,{
      //   opacity: 0,
      //   scale: 0.8,
      //   x: -300
      // })

      // gsap.from(imagenRef.value, {
      //   opacity: 0,
      //   scale: 0.8,
      //   x: -300,
      //   duration: 2.5,
      //   ease: 'linear'
      // });
    }


  });
}

onMounted(() => {
  // animarEntrada();
});

onActivated(() => {
  animarEntrada();
});

watch(infografiaActual, () => {
  // animarEntrada();
});

onUnmounted(() => {
  marcadorActivo.value = null;
})



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

    &:has(.info)
      .detalles,
      .modelo > img
        filter: brightness(0.25);

  .detalles
    position absolute
    background: linear-gradient(90deg, transparent 0%, var(--color));
    mix-blend-mode: plus-lighter;
    padding vh(32px) vw(96px)
    display flex
    gap vw(20px)
    z-index 1
    transition all .5s ease

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

  .modelo
    position relative
    img
      transition all .5s ease

  .info
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    width 100%
    perspective: 800px;

    .marca
      position absolute
      transform-origin 50% 100%
      transition: all .9s ease

    .panel
      position absolute
      left 10%
      right 10%
      bottom 5%
      padding vh(32px) vw(32px)
      transform-style: preserve-3d;

      .titulo
        font-size vh(26px)
        font-weight 900
        background: linear-gradient(90deg, var(--color) -50%, transparent);
        padding .2em .3em
        margin-bottom vh(16px)

      .descripcion
        font-size vh(24px)

        :deep()
          p
            font-size inherit
            text-align left

          li
            margin-bottom .5em

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
        flex 0 0 60%
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
        flex 1 1 35%

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
    margin-top vh(-96px)
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
    padding-left vw(160px)

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

.transicion-info
  &-enter-active
      transition: all 0.5s ease;
      .marca img
        transition: all 0.2s ease;
      .panel
        transition: all 0.5s ease;
        transition-delay: 0.2s
  &-leave-active
      transition: all 0.4s ease;
      .marca img
        transition: all 0.2s ease;
        transition-delay: 0.1s
      .panel
        transition: all 0.2s ease;

  &-enter-from
  &-leave-to
      .marca img
        opacity: 0;
        transform: scale(1.5) translateY(-150%);
      .panel
        opacity: 0;
        transform: rotateX(45deg) scale(0.8);

  &-enter-to
  &-leave-from
      .marca img
        opacity: 1;
        transform: scale(1) translateY(0%);
      .panel
        opacity: 1;
        transform: rotateX(0deg) scale(1);



</style>
