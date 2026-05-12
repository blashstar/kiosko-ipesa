<template lang="pug">
JDVista
  template(v-slot:encabezado)
    JDLogo


  figure.logo-ipesa
    img(src="/img/logo-ipesa.png")
  JDTitulo.titular
    | CONOCE MÁS AQUÍ
    strong >

  .qr_contenedor
    img(src="/img/qr.svg")

  template(v-slot:pie)
    .grupo
      JDBotonVolver
      JDBotonInicio

  template(v-slot:fondo)
    img(src="/img/fondo-02.jpg")
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import _ from 'lodash';
import { gsap } from 'gsap';
import JDVista from '@jd/JDVista.vue';
import JDLogo from '@jd/JDLogo.vue';
import JDTitulo from '@jd/JDTitulo.vue';
import JDBotonImagen from '@jd/JDBotonImagen.vue';
import JDBotonQR from '@jd/JDBotonQR.vue';
import JDBotonInicio from '@jd/JDBotonInicio.vue';
import JDBotonVolver from '@jd/JDBotonVolver.vue';
import JDBotonNav from '@jd/JDBotonNav.vue';

import usarNavegacion from '@utiles/navegacion';
import { useAlmacenInterfaz } from '@/almacenes/interfaz';
import { rotarAlCentro } from '@utiles/colecciones';

const { seccion } = usarNavegacion();
const almacenInterfaz = useAlmacenInterfaz();

const menuOpciones = computed(() => almacenInterfaz.menuOpciones);
const idResaltado = ref<number>(Math.floor(_.size(menuOpciones.value) / 2));
const opcionResaltada = computed(() => _.nth(menuOpciones.value, idResaltado.value));

const opcionesArregladas = computed(() => {
  return rotarAlCentro(menuOpciones.value, idResaltado.value);
});

const tituloNavRef = ref<HTMLElement | null>(null);

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

</script>

<style lang="stylus" scoped>

.logo-ipesa
  width vw(600px)
  margin vh(48px) auto;

.titular
  font-weight: 900;
  font-size: vh(40px);
  text-align: center;
  color #E0E0E0;
  margin vh(24px) auto;

  text-shadow: 5px 10px 5px rgba(0, 0, 0, 0.49);
  strong
    color #FCB515
    margin-left .2em




.qr_contenedor
  box-sizing: border-box;
  width vw(610px)

  background: linear-gradient(134.97deg, rgba(219, 219, 219, 0.96) 4.73%, rgba(255, 255, 255, 0.96) 62.55%);
  box-shadow: 7px 7px 10.4px rgba(0, 0, 0, 0.55);
  border-radius: 22px;
  border 2px solid #FCB515
  margin 0 auto;

.grupo
  margin-left auto

</style>
