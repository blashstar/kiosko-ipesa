<template lang="pug">

JDVista.comparativa(:style="estiloComparativa")
  template(v-slot:encabezado)
    JDLogo
    JDLogoSeccion(seccion="versus")


  JDTitulo.titular.l1 !Compra y decide
  JDTitulo.titular.l2 TU PRÓXIMO EQUIPO!

  .tabla(v-if="comparativaActual")
    .columna.a(ref="columnaARef")
      .encabezado
        .categoria {{comparativaActual.categoria}}
        .producto(:style="estiloModelo")
          span.letras {{modeloA.letras}}
          span.ultima {{modeloA.ultima}}
      .imagen
        img(:src="comparativaActual.maquinariaA.imagen")
      .caracteristica(v-for="carateristica, idc in comparativaActual.maquinariaA.carateristicas" :key="idc")
        .etiqueta {{carateristica.titulo}}
        .valor(:style="estiloValor(carateristica)")
          span(v-if="typeof carateristica.valor === 'string'") {{carateristica.valor}}
          template(v-else)
            div(v-for="(item, idx) in carateristica.valor" :key="idx") {{item}}
    .columna.b(ref="columnaBRef")
      .encabezado
        .categoria {{comparativaActual.categoria}}
        .producto(:style="estiloModelo")
          span.letras {{modeloB.letras}}
          span.ultima {{modeloB.ultima}}
      .imagen
        img(:src="comparativaActual.maquinariaB.imagen")
      .caracteristica(v-for="carateristica, idc in comparativaActual.maquinariaB.carateristicas" :key="idc")
        .etiqueta {{carateristica.titulo}}
        .valor(:style="estiloValor(carateristica)")
          span(v-if="typeof carateristica.valor === 'string'") {{carateristica.valor}}
          template(v-else)
            div(v-for="(item, idx) in carateristica.valor" :key="idx") {{item}}


  //- pre {{comparativaActual}}


  template(v-slot:pie)
    .grupo
      JDBotonVolver
      JDBotonInicio

  template(v-slot:fondo)
    img(src="/img/fondo-02.jpg")
</template>

<script setup lang="ts">
import { ref, computed, shallowRef, onMounted, watch, nextTick, onActivated } from 'vue';
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { gsap } from 'gsap';
import JDVista from '@jd/JDVista.vue';
import JDLogo from '@jd/JDLogo.vue';
import JDLogoSeccion from '@jd/JDLogoSeccion.vue';
import JDTitulo from '@jd/JDTitulo.vue';
import JDBotonQR from '@jd/JDBotonQR.vue';
import JDBotonInicio from '@jd/JDBotonInicio.vue';
import JDBotonVolver from '@jd/JDBotonVolver.vue';
import JDBotonNav from '@jd/JDBotonNav.vue';

import { usarObservadorResize } from '@utiles/dimensiones';
import usarNavegacion from '@utiles/navegacion';
import { useAlmacenComparativas } from '@/almacenes/comparativas';

const almacenComparativas = useAlmacenComparativas();
const { comparativaActual } = storeToRefs(almacenComparativas);

const estiloComparativa = computed(() => ({
  "--color": comparativaActual?.value?.color ?? "#666666"
}))

const modeloA = computed(()=> ({
  ...dividirPalabra(comparativaActual?.value.maquinariaA?.modelo ?? "")
}) )

const modeloB = computed(()=> ({
  ...dividirPalabra(comparativaActual?.value.maquinariaB?.modelo ?? "")
}) )

function dividirPalabra(palabra) {
  return {
    letras: _.slice(palabra, 0, -1).join(""),
    ultima: _.last(palabra)
  };
}

const columnaARef = ref<HTMLElement | null>(null);
const columnaBRef = ref<HTMLElement | null>(null);

function animarEntrada() {
  nextTick(() => {
    if (!columnaARef.value || !columnaBRef.value) return;

    const tl = gsap.timeline({ delay: 0.15 });

    // Columnas entran desde lados opuestos al mismo tiempo
    tl.fromTo(columnaARef.value,
      { opacity: 0, x: -80, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
      0
    );
    tl.fromTo(columnaBRef.value,
      { opacity: 0, x: 80, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
      0
    );

    // Encabezados e imagenes con fade
    const encabezados = [
      columnaARef.value.querySelector('.encabezado'),
      columnaBRef.value.querySelector('.encabezado'),
    ];
    tl.fromTo(encabezados,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      0.25
    );

    const imagenes = [
      columnaARef.value.querySelector('.imagen'),
      columnaBRef.value.querySelector('.imagen'),
    ];
    tl.fromTo(imagenes,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
      0.35
    );

    // Características escalonadas (intercaladas A/B para efecto versus)
    const carA = columnaARef.value.querySelectorAll('.caracteristica');
    const carB = columnaBRef.value.querySelectorAll('.caracteristica');

    tl.fromTo(carA,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.07, ease: 'power2.out' },
      0.45
    );
    tl.fromTo(carB,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.07, ease: 'power2.out' },
      0.45
    );
  });
}

const estiloModelo = computed(() => {
  const estilo = {}
  if(comparativaActual?.value?.estiloModelo?.altura){
    estilo["fontSize"] = comparativaActual.value.estiloModelo.altura + "vh"
  }
  return estilo
})

function estiloValor(caracteristica){
  return caracteristica?.estiloValor ?? {}
}

// onMounted(animarEntrada);
onActivated(animarEntrada);
watch(comparativaActual, animarEntrada);


</script>

<style lang="stylus" scoped>

.comparativa
  --color: grey

.titular
  font-weight 600
  font-size: vh(65px);
  line-height: 1.3;
  text-align: center;
  color var(--color)
  text-shadow: 5px 10px 5px rgba(0, 0, 0, 0.49);

  &.l1
    font-weight 400
    color white


.tabla
  margin-top vh(48px)
  display grid
  grid-template-columns 1fr 1fr
  grid-template-rows auto 1fr repeat(9, auto)
  grid-auto-rows auto
  gap 0 vw(64)
  // background #000
  margin-inline vw(64px)

.columna
  grid-row 1 / -1
  box-sizing: border-box;

  background: linear-gradient(106.73deg, rgba(64, 64, 64, 0.54) 9.55%, rgba(0, 0, 0, 0.54) 67.37%);
  box-shadow: 6px 7px 10.4px rgba(0, 0, 0, 0.48);
  border-radius: 22px;
  display grid
  grid-template-columns 1fr
  grid-template-rows subgrid
  border 1px solid var(--color)
  padding-block-end vh(16px)

  .encabezado
    padding vh(55px) vw(38px) 0
    // align-self end

  .categoria
    font-weight: 500;
    font-size: vh(24px);
    line-height 1
    color: #FFFFFF;

  .producto
    font-weight: 900;
    font-size: vh(125px);
    line-height 1
    display: flex;
    align-items: baseline;

    color: #FFFFFF;

    text-shadow: 5px 7px 10px rgba(0, 0, 0, 0.59);

    span
      white-space nowrap

    .ultima
      color var(--color)

  .imagen
    display flex
    flex-direction column
    align-self end

    img
      margin-block-end vh(16px)
      margin-inline auto
      max-width 85%
      max-height 10vh

    &::after
      content ""
      background: linear-gradient(to right, var(--color), transparent);
      height vh(38px)

  .caracteristica
    display flex
    flex-direction column
    margin-inline vw(32px) vw(20px)
    padding-block vh(16px)

    .etiqueta
      font-size vh(18px)
      font-weight 400
      line-height 1.2

    .valor
      font-size vh(24px)
      font-weight 500
      line-height 1.2

    &:first-of-type
      padding-block vh(16px)

    + .caracteristica
      padding-block 0 vh(16px)

      &::before
        content ""
        margin-bottom vh(20px)
        background: linear-gradient(to right, var(--color), transparent);
        height 2px
        width 100%

  &.b
    .categoria
    .producto
      text-align right
    .producto
      justify-content end
    .imagen
      &::after
        background: linear-gradient(to left, var(--color), transparent);

.grupo
  margin-left auto


:deep()
  .jd_vista__contenido
    justify-content: start;
</style>
