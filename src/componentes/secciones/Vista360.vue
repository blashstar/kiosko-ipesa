<template lang="pug">
JDVista
  template(v-slot:encabezado)
    JDLogo
    JDLogoSeccion(seccion="vistas-360")

  .visor-wrapper(v-if="escenaActual")
    Visor360(:escena="escenaActual" @navegar="alNavegar")
  .cargando(v-else) Cargando...

  template(v-slot:pie)
    .grupo
      JDBotonVolver
      JDBotonInicio

  template(v-slot:fondo)
    img(src="/img/fondo-02.jpg")
</template>

<script setup lang="ts">
import { ref, computed, watch, onActivated, onDeactivated, onUnmounted } from 'vue';
import type { ComputedRef } from 'vue';
import JDVista from '@jd/JDVista.vue';
import JDLogo from '@jd/JDLogo.vue';
import JDLogoSeccion from '@jd/JDLogoSeccion.vue';
import JDTitulo from '@jd/JDTitulo.vue';
import JDBotonQR from '@jd/JDBotonQR.vue';
import JDBotonInicio from '@jd/JDBotonInicio.vue';
import JDBotonVolver from '@jd/JDBotonVolver.vue';
import Visor360 from '../comun/Visor360.vue';
import { useAlmacenVistas360, type IEscena } from '@/almacenes/vistas360';
import { useAlmacenInterfaz } from '@/almacenes/interfaz';

const almacenVistas360 = useAlmacenVistas360();
const vistaActual = computed(() => almacenVistas360.vistaActual);

const almacenInterfaz = useAlmacenInterfaz();

const indiceEscena = ref(0);

const escenaActual: ComputedRef<IEscena | null> = computed(() => {
  return vistaActual.value?.escenas[indiceEscena.value] || null;
});

const totalEscenas = computed(() => vistaActual.value?.escenas.length || 0);

watch(() => vistaActual.value, (nueva) => {
  indiceEscena.value = 0;
  almacenInterfaz.setMarca(nueva?.marca ?? 'JohnDeere');
});

onActivated(() => {
  almacenInterfaz.setMarca(vistaActual.value?.marca ?? 'JohnDeere');
});

onDeactivated(() => {
  almacenInterfaz.setMarca('JohnDeere');
});

onUnmounted(() => {
  almacenInterfaz.setMarca('JohnDeere');
});

function alNavegar(destino: string) {
  const indice = vistaActual.value?.escenas.findIndex((e) => e.id === destino);
  if (indice !== undefined && indice !== -1) {
    indiceEscena.value = indice;
  }
}
</script>

<style lang="stylus" scoped>
.titulo
  font-size: 1.8rem
  color: #FCB515

.visor-wrapper
  width: 100%
  height: 100%

.cargando
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%
  color: #FCB515
  font-size: 1.5rem

.grupo
  margin-left auto

  :deep()
    .boton-tactil
    // .jd_boton_brillo__contenido
      filter: none
      // background-color rgba(black, .8)
      // background-image radial-gradient(black, rgba(black, .5))
      border-radius 100%
      box-shadow inset 0 0 20px 20px rgba(black, .5), 0 0 10px #FCB515

.nav-escenas
  display: flex
  align-items: center
  justify-content: center
  gap: 1rem
  padding: 1rem 0

  .indicador
    font-size: 1.2rem
    color: white
    min-width: 3rem
    text-align: center

:deep(.jd_vista)
  .jd_vista__encabezado
    position: absolute
    top: 0
    left: 0
    right: 0
    z-index: 2
  .jd_vista__pie
    position: absolute
    bottom: 0
    left: 0
    right: 0
    z-index: 2
  .jd_vista__contenido
    position: absolute
    inset: 0
    z-index: 1
</style>
