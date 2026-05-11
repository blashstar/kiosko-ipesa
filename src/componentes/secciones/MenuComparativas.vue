<template lang="pug">
JDVista
  template(v-slot:encabezado)
    JDLogo
    JDLogoSeccion(seccion="versus")

  JDTitulo.subtitulo ¿UNA MEJOR PERSPECTIVA?
  JDTitulo.titular
    | ¡COMPARA Y EXPLORA LOS EQUIPOS!

  .carrusel-container(ref="contenedorRef")
    Carousel3d(
      ref="carruselRef"
      :width="anchoSlide"
      :height="altoSlide"
      :perspective="0"
      :space="300"
      :display="6"
      :startIndex="idResaltado"
      :onMainSlideClick="() => {seleccionar(opcionResaltada.id)}"
      @after-slide-change="alCambiarSlide"
    )
      Slide(
        v-for="(opcion, idx) in listaComparativas"
        :key="idx"
        :index="idx"
      )
        figure: img(:src="opcion.tarjeta" :alt="etiquetaComparativa(opcion)")

  .nav
    JDBotonNav.boton(direccion="oeste" @accion="izquierda")
    .titulo(ref="tituloNavARef")
      .categoria {{ opcionResaltada?.maquinariaA?.categoria }}
      .modelo {{ opcionResaltada?.maquinariaA?.modelo }}

    .separador(ref="separadorRef")

    .titulo(ref="tituloNavBRef")
      .categoria {{ opcionResaltada?.maquinariaB?.categoria }}
      .modelo {{ opcionResaltada?.maquinariaB?.modelo }}
    JDBotonNav.boton(direccion="este" @accion="derecha")
  template(v-slot:pie)
    JDBotonQR
    .grupo
      JDBotonVolver
      JDBotonInicio

  template(v-slot:fondo)
    img(src="/img/fondo-02.jpg")
</template>

<script setup lang="ts">
import { ref, computed, shallowRef, watch } from 'vue';
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { gsap } from 'gsap';
import JDVista from '@jd/JDVista.vue';
import JDLogo from '@jd/JDLogo.vue';
import JDLogoSeccion from '@jd/JDLogoSeccion.vue';
import JDTitulo from '@jd/JDTitulo.vue';
import { Carousel3d, Slide } from '@nanoandrew4/vue3-carousel-3d';
import JDBotonQR from '@jd/JDBotonQR.vue';
import JDBotonInicio from '@jd/JDBotonInicio.vue';
import JDBotonVolver from '@jd/JDBotonVolver.vue';
import JDBotonNav from '@jd/JDBotonNav.vue';

import { usarObservadorResize } from '@utiles/dimensiones';
import usarNavegacion from '@utiles/navegacion';
import { useAlmacenComparativas } from '@/almacenes/comparativas';

const { seccion } = usarNavegacion();
const almacenComparativas = useAlmacenComparativas();
const { listaComparativas } = storeToRefs(almacenComparativas);

const contenedorRef = ref<HTMLElement | null>(null);
const { ancho, alto } = usarObservadorResize(contenedorRef);

const anchoSlide = computed(() => Math.round(alto.value * 0.9));
const altoSlide = computed(() => Math.round(alto.value * 0.9));

const idResaltado = ref<number>(Math.floor(_.size(listaComparativas.value) / 2));
const opcionResaltada = computed(() => _.nth(listaComparativas.value, idResaltado.value));

function etiquetaComparativa(opcion: any) {
  if (!opcion) return '';
  const a = opcion.maquinariaA?.modelo || '';
  const b = opcion.maquinariaB?.modelo || '';
  return `${a} vs ${b}`;
}

function seleccionar(id: string) {
  almacenComparativas.seleccionarComparativa(id);
  seccion('comparativa');
}

const carruselRef = shallowRef<any>(null);
const tituloNavARef = ref<HTMLElement | null>(null);
const tituloNavBRef = ref<HTMLElement | null>(null);
const separadorRef = ref<HTMLElement | null>(null);

function animarTituloNav(contenedor: HTMLElement | null, delay: number = 0) {
  if (!contenedor) return;
  const hijos = contenedor.querySelectorAll('.categoria, .modelo');
  gsap.fromTo(hijos,
    { opacity: 0, y: 18, scale: 0.97 },
    { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.05, delay, ease: 'power2.out' }
  );
}

watch(opcionResaltada, () => {
  animarTituloNav(tituloNavARef.value, 0);
  animarTituloNav(tituloNavBRef.value, 0.12);
  if (separadorRef.value) {
    gsap.fromTo(separadorRef.value,
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 0.3, delay: 0.08, ease: 'power2.out' }
    );
  }
}, { flush: 'post' });

function alCambiarSlide(index: number) {
  idResaltado.value = index;
}

function izquierda() {
  carruselRef.value?.goPrev();
}

function derecha() {
  carruselRef.value?.goNext();
}
</script>

<style lang="stylus" scoped>
.titular
  font-size: vh(65px)
  font-weight: 900
  color: white
  background-image: linear-gradient(to left, #FCB51599, transparent 80%)
  text-align center
  padding vh(36px)
  text-shadow 0 10px 5px #00000099

.subtitulo
  font-weight: 500;
  font-size: vh(35px);
  color: #FCB515;
  text-shadow: 5px 10px 5px rgba(0, 0, 0, 0.49);
  margin-bottom vh(24px)
  text-align center


.carrusel-container
  width: 100%
  max-width: 1200px
  height: vh(640px)
  margin: 0 auto
  padding: 2rem 0

:deep(.carousel-3d-slide)
  cursor pointer
  background none
  border none

.nav
  display flex
  align-items center
  justify-content center
  width 75%
  margin-inline auto
  height vh(120px)
  gap vw(24px)

  .titulo
    flex 1 0 auto
    color white
    font-weight 700
    text-shadow 0 0 10px rgba(0, 0, 0, 0.5)
    text-wrap balance
    word-break normal
    text-align center
    text-transform uppercase

  .categoria
    display block
    font-size vh(25px)

  .modelo
    font-size vh(65px)

  .separador
    width: 0px;
    height: vh(64px);
    border: vw(4px) solid #FCB515;

  .boton
    flex 0 0 auto
</style>
