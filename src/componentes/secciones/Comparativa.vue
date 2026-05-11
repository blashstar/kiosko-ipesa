<template lang="pug">

JDVista
  template(v-slot:encabezado)
    JDLogo
    JDLogoSeccion(seccion="versus")


  //- JDTitulo.titular
  //-   | ¡COMPARA Y DECIDE TU PRÓXIMO EQUIPO!

  //- pre {{comparativaActual}}


  template(v-slot:pie)
    JDBotonQR
    .grupo
      JDBotonVolver
      JDBotonInicio

  template(v-slot:fondo)
    img(src="/img/fondo-02.jpg")
</template>

<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue';
import _ from 'lodash';
import { storeToRefs } from 'pinia';
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

</script>

<style lang="stylus" scoped>

.titular

  font-weight: 400;
  font-size: 65px;
  line-height: 78px;
  display: flex;
  align-items: center;
  text-align: center;

  background: linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  text-shadow: 5px 10px 5px rgba(0, 0, 0, 0.49);



</style>
