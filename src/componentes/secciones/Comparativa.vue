<template lang="pug">

JDVista.comparativa(:style="estiloComparativa")
  template(v-slot:encabezado)
    JDLogo
    JDLogoSeccion(seccion="versus")


  JDTitulo.titular.l1 ¡Compra y decide
  JDTitulo.titular.l2 TU PRÓXIMO EQUIPO!

  .tabla(v-if="comparativaActual", :class="comparativaActual.id.toLowerCase()")
    .columna.a(ref="columnaARef", :class="comparativaActual.maquinariaA.id.toLowerCase()")
      .encabezado
        .categoria {{comparativaActual.categoria}}
        .producto(:style="estiloModelo")
          span.letras {{modeloA.letras}}
          span.ultima {{modeloA.ultima}}
      .imagen
        figure: img(:src="comparativaActual.maquinariaA.imagen")
      .caracteristica(v-for="caracteristica, idc in comparativaActual.maquinariaA.caracteristicas" :key="idc", :class="`c-${idc}`")
        .etiqueta {{caracteristica.titulo}}
        .valor(:style="estiloValor(caracteristica)")
          span(v-if="typeof caracteristica.valor === 'string'" v-html="formatearValor(caracteristica.valor)")
          template(v-else)
            div(v-for="(item, idx) in caracteristica.valor" :key="idx" v-html="formatearValor(item)")
    .columna.b(ref="columnaBRef", :class="comparativaActual.maquinariaB.id.toLowerCase()")
      .encabezado
        .categoria {{comparativaActual.categoria}}
        .producto(:style="estiloModelo")
          span.letras {{modeloB.letras}}
          span.ultima {{modeloB.ultima}}
      .imagen
        figure: img(:src="comparativaActual.maquinariaB.imagen")
      .caracteristica(v-for="caracteristica, idc in comparativaActual.maquinariaB.caracteristicas" :key="idc", :class="`c-${idc}`")
        .etiqueta {{caracteristica.titulo}}
        .valor(:style="estiloValor(caracteristica)")
          span(v-if="typeof caracteristica.valor === 'string'" v-html="formatearValor(caracteristica.valor)")
          template(v-else)
            div(v-for="(item, idx) in caracteristica.valor" :key="idx" v-html="formatearValor(item)")


  //- pre {{comparativaActual}}


  template(v-slot:pie)
    .grupo
      JDBotonVolver
      JDBotonInicio

  template(v-slot:fondo)
    img(src="/img/fondo-02.jpg")
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  shallowRef,
  onMounted,
  watch,
  nextTick,
  onActivated,
  onDeactivated,
  onUnmounted,
} from 'vue';
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
import { useAlmacenInterfaz } from '@/almacenes/interfaz';

const almacenComparativas = useAlmacenComparativas();
const { comparativaActual } = storeToRefs(almacenComparativas);

const almacenInterfaz = useAlmacenInterfaz();

const estiloComparativa = computed(() => ({
  '--color': comparativaActual?.value?.color ?? '#666666',
}));

const modeloA = computed(() => ({
  ...dividirPalabra(comparativaActual?.value.maquinariaA?.modelo ?? ''),
}));

const modeloB = computed(() => ({
  ...dividirPalabra(comparativaActual?.value.maquinariaB?.modelo ?? ''),
}));

function dividirPalabra(palabra) {
  return {
    letras: _.slice(palabra, 0, -1).join(''),
    ultima: _.last(palabra),
  };
}

const columnaARef = ref<HTMLElement | null>(null);
const columnaBRef = ref<HTMLElement | null>(null);

function animarEntrada() {
  nextTick(() => {
    if (!columnaARef.value || !columnaBRef.value) return;

    const tl = gsap.timeline({ delay: 0.15 });

    // Columnas entran desde lados opuestos al mismo tiempo
    tl.fromTo(
      columnaARef.value,
      { opacity: 0, x: -80, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
      0
    );
    tl.fromTo(
      columnaBRef.value,
      { opacity: 0, x: 80, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
      0
    );

    // Encabezados e imagenes con fade
    const encabezados = [
      columnaARef.value.querySelector('.encabezado'),
      columnaBRef.value.querySelector('.encabezado'),
    ];
    tl.fromTo(
      encabezados,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      0.25
    );

    const imagenes = [
      columnaARef.value.querySelector('.imagen'),
      columnaBRef.value.querySelector('.imagen'),
    ];
    tl.fromTo(
      imagenes,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
      0.35
    );

    // Características escalonadas (intercaladas A/B para efecto versus)
    const carA = columnaARef.value.querySelectorAll('.caracteristica');
    const carB = columnaBRef.value.querySelectorAll('.caracteristica');

    tl.fromTo(
      carA,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.07, ease: 'power2.out' },
      0.45
    );
    tl.fromTo(
      carB,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.07, ease: 'power2.out' },
      0.45
    );
  });
}

const estiloModelo = computed(() => {
  const estilo = {};
  if (comparativaActual?.value?.estiloModelo?.altura) {
    estilo['fontSize'] = comparativaActual.value.estiloModelo.altura + 'vh';
  }
  return estilo;
});

function estiloValor(caracteristica) {
  return caracteristica?.estiloValor ?? {};
}

function formatearValor(valor){
  return valor.replace("\n", "<br>")
}

// onMounted(animarEntrada);
onActivated(() => {
  almacenInterfaz.setMarca(comparativaActual.value?.marca ?? 'JohnDeere');
  animarEntrada();
});
watch(comparativaActual, (nueva) => {
  almacenInterfaz.setMarca(nueva?.marca ?? 'JohnDeere');
  animarEntrada();
});

onDeactivated(() => {
  almacenInterfaz.setMarca('JohnDeere');
});

onUnmounted(() => {
  almacenInterfaz.setMarca('JohnDeere');
});
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
  margin-top vh(24px)
  display grid
  grid-template-columns 1fr 1fr
  grid-template-rows auto 1fr repeat(9, auto)
  grid-auto-rows auto
  gap 0 vw(64px)
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
    padding vh(48px) vw(38px) vh(16px)
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
    align-self stretch
    display flex
    flex-direction column
    justify-content end

    figure
      flex 1 1 auto
      padding-inline vw(8px)
      margin-block 0 vh(8px)
      display flex
      flex-direction column
      justify-content center

      img
        margin-inline auto

    &::after
      content ""
      background: linear-gradient(to right, var(--color), transparent);
      height vh(38px)

  .caracteristica
    display flex
    flex-direction column
    margin-inline vw(24px) vw(20px)
    padding-block vh(16px)

    .etiqueta
      font-size vh(18px)
      font-weight 400
      line-height 1.2

    .valor
      font-size vh(24px)
      font-weight 500
      line-height 1.2
      margin-inline 0 vw(-16px)
      text-wrap balance

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


.vs-tt1050k-tt850j
  .tt1050k
    .producto
      font-size 110px

    .imagen img
      width 95%

.vs-e250p-e210p .e210p .imagen img
      width 90%
</style>
