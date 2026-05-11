<template lang="pug">
JDVista
  template(v-slot:encabezado)
    JDLogo
    JDLogoSeccion(seccion="vistas-360")

  JDTitulo.titular
    | ¡DESCUBRE LO QUE NOS HACE GIGANTES!

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
        v-for="(opcion, idx) in listaMaquinarias"
        :key="idx"
        :index="idx"
      )
        figure: img(:src="opcion.tarjeta" :alt="opcion.modelo")

  .nav
    JDBotonNav.boton(direccion="oeste" @accion="izquierda")
    .titulo(ref="tituloNavRef")
      .categoria {{ opcionResaltada?.categoria }}
      .modelo {{ opcionResaltada?.modelo }}
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
import JDBotonImagen from '@jd/JDBotonImagen.vue';
import JDBotonQR from '@jd/JDBotonQR.vue';
import JDBotonInicio from '@jd/JDBotonInicio.vue';
import JDBotonVolver from '@jd/JDBotonVolver.vue';
import JDBotonNav from '@jd/JDBotonNav.vue';

import { usarObservadorResize } from '@utiles/dimensiones';
import usarNavegacion from '@utiles/navegacion';
import { useAlmacenInterfaz } from '@/almacenes/interfaz';
import { useAlmacenVistas360 } from '@/almacenes/vistas360';

const { seccion } = usarNavegacion();
const almacenVistas360 = useAlmacenVistas360();
const { listaMaquinarias } = storeToRefs(almacenVistas360);

const contenedorRef = ref<HTMLElement | null>(null);
const { ancho, alto } = usarObservadorResize(contenedorRef);

const anchoSlide = computed(() => Math.round(alto.value * 0.9));
const altoSlide = computed(() => Math.round(alto.value * 0.9));

const idResaltado = ref<number>(Math.floor(_.size(listaMaquinarias.value) / 2));
const opcionResaltada = computed(() => _.nth(listaMaquinarias.value, idResaltado.value));


function seleccionar(id: string) {
  almacenVistas360.seleccionarVista(id);
  seccion('vista-360');
}

const carruselRef = shallowRef<any>(null);
const tituloNavRef = ref<HTMLElement | null>(null);

watch(opcionResaltada, () => {
  if (!tituloNavRef.value) return;
  const hijos = tituloNavRef.value.querySelectorAll('.categoria, .modelo');
  gsap.fromTo(hijos,
    { opacity: 0, y: 18, scale: 0.97 },
    { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
  );
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
  width 50%
  margin-inline auto
  height vh(120px)



  .titulo
    flex 1 1 auto
    color white
    font-weight 700
    text-shadow 0 0 10px rgba(0, 0, 0, 0.5)
    margin-left vh(24px)
    text-wrap balance
    word-break normal
    text-align center
    text-transform uppercase

  .categoria
    display block
    font-size vh(24px)

  .modelo
    font-size vh(65px)

  .boton
    flex 0 0 auto
</style>
