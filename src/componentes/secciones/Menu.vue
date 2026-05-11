<template lang="pug">
JDVista
  template(v-slot:encabezado)
    JDLogo

  JDTitulo.titular
    | ¡DESCUBRE LO QUE NOS HACE GIGANTES!
  .opciones(ref="opcionesRef")
    TransitionGroup(name="menu-opciones")
      JDBotonImagen.opcion(
        v-for="opcion in opcionesArregladas"
        :key="opcion.id"
        :imagen="opcion.tarjeta"
        @accion="seccion(opcion.nombre)"
      )
  .nav
    JDBotonNav.boton(direccion="oeste" @accion="izquierda")
    .titulo(ref="tituloNavRef") {{ opcionResaltada.titulo }}
    JDBotonNav.boton(direccion="este" @accion="derecha")
  template(v-slot:pie)
    JDBotonQR
    .grupo
      JDBotonInicio

  template(v-slot:fondo)
    img(src="/img/fondo-02.jpg")
    .banda
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onActivated } from 'vue';
import _ from 'lodash';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import JDVista from '@jd/JDVista.vue';
import JDLogo from '@jd/JDLogo.vue';
import JDTitulo from '@jd/JDTitulo.vue';
import JDBotonImagen from '@jd/JDBotonImagen.vue';
import JDBotonQR from '@jd/JDBotonQR.vue';
import JDBotonInicio from '@jd/JDBotonInicio.vue';
import JDBotonNav from '@jd/JDBotonNav.vue';

import usarNavegacion from '@utiles/navegacion';
import { useAlmacenInterfaz } from '@/almacenes/interfaz';
import { rotarAlCentro } from '@utiles/colecciones';

gsap.registerPlugin(CSSPlugin);

const { seccion } = usarNavegacion();
const almacenInterfaz = useAlmacenInterfaz();

const menuOpciones = computed(() => almacenInterfaz.menuOpciones);
const idResaltado = ref<number>(Math.floor(_.size(menuOpciones.value) / 2));
const opcionResaltada = computed(() => _.nth(menuOpciones.value, idResaltado.value));

const opcionesArregladas = computed(() => {
  return rotarAlCentro(menuOpciones.value, idResaltado.value);
});

const opcionesRef = ref<HTMLElement | null>(null);
const tituloNavRef = ref<HTMLElement | null>(null);

function animarEntradaOpciones() {
  nextTick(() => {
    if (!opcionesRef.value) return;

    const elementos = opcionesRef.value.querySelectorAll('.opcion');
    if (elementos.length === 0) return;

    // Estado inicial: opciones arriba y transparentes
    // gsap.set(elementos, {
    //   opacity: 0,
    //   y: -600,
    //   scale: 0.8,
    // });

    // // Animación escalonada desde arriba
    // gsap.to(elementos, {
    //   opacity: 1,
    //   y: 0,
    //   scale: 1,
    //   duration: 0.8,
    //   ease: 'power3.out',
    //   stagger: 0.15,
    //   delay: 0.2,
    // });

    // gsap.from(elementos, {
    //   opacity: 0,
    //   y: -600,
    //   scale: 0.6,
    //   duration: 0.8,
    //   ease: 'power3.out',
    //   stagger: 0.15,

    // })
  });
}

watch(opcionResaltada, () => {
  if (!tituloNavRef.value) return;
  gsap.fromTo(tituloNavRef.value,
    { opacity: 0, y: 18, scale: 0.97 },
    { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
  );
}, { flush: 'post' });

function izquierda() {
  if (idResaltado.value > 0)
     idResaltado.value -= 1
  else
    idResaltado.value = _.size(menuOpciones.value) - 1
}

function derecha() {
  if (idResaltado.value < _.size(menuOpciones.value) - 1)
    idResaltado.value += 1;
  else
    idResaltado.value = 0
}

onMounted(() => {
  animarEntradaOpciones();
});

onActivated(() => {
  animarEntradaOpciones();
});
</script>

<style lang="stylus" scoped>

.banda
  position absolute
  top 0
  left 50%
  transform translateX(-50%)
  width vw(611px, "%")
  height vh(678px)
  background linear-gradient(to bottom, rgba(252, 181, 21, 0.6), transparent)

.titular
  text-align center
  font-size vh(75px)
  font-weight 900
  color white
  margin-bottom vh(32px)
  &:first-line
    font-size vh(50px)

.opciones
  display flex
  align-items end
  justify-content center
  padding vh(40px) vh(48px) vh(80px)

  .opcion
    margin-inline vh(-24px)
    :deep(.jd_boton_imagen__contenido)
      animation levitacion 3s ease-in-out infinite
      img
        height vh(780px)

    for i in 1..5
      &:nth-child({i})
        transition-delay (i - 1) * 0.1s

      &:nth-child({i}) :deep(.jd_boton_imagen__contenido)
        animation-delay (i - 1) * 0.5s
        animation-duration 2.5s + (i - 1) * 0.5s
        margin-bottom vh((i - 1) * 80px)

// Transiciones del TransitionGroup
.menu-opciones-move
  transition transform 0.6s ease

.menu-opciones-enter-active
  transition all 0.8s ease

.menu-opciones-leave-active
  transition all 0.4s ease

.menu-opciones-enter-from
  opacity 0
  transform translateY(-100px) scale(0.8)

.menu-opciones-leave-to
  opacity 0
  transform translateY(100px) scale(0.8)

.nav
  display flex
  align-items center
  justify-content center
  width 50%
  margin-inline auto
  height vh(120px)

  .titulo
    flex 1 1 auto
    font-size vh(40px)
    color white
    font-weight 700
    text-shadow 0 0 10px rgba(0, 0, 0, 0.5)
    margin-left vh(24px)
    text-wrap balance
    word-break normal
    text-align center
    text-transform uppercase

  .boton
    flex 0 0 auto
</style>
