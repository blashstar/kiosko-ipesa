<template lang="pug">
#app.contenedor-app
  //- Pantalla de inicio
 Inicio(
    v-if="seccionActual === 'inicio'"
    @navegar="navegarSeccion"
  )

  //- Menú principal
  Menu(
    v-else-if="seccionActual === 'menu'"
    @navegar="navegarSeccion"
  )

  //- Menú vistas 360°
  MenuVistas360(
    v-else-if="seccionActual === 'menu-vistas-360'"
    @navegar="navegarSeccion"
  )

  //- Menú infografías
  MenuInfografias(
    v-else-if="seccionActual === 'menu-infografias'"
    @navegar="navegarSeccion"
  )

  //- Menú comparativas
  MenuComparativas(
    v-else-if="seccionActual === 'menu-comparativas'"
    @navegar="navegarSeccion"
  )

  //- Vista 360°
  Vista360(
    v-else-if="seccionActual === 'vista-360'"
    @volver="volver"
  )

  //- Infografía
  Infografia(
    v-else-if="seccionActual === 'infografia'"
    @volver="volver"
  )

  //- Comparativa
  Comparativa(
    v-else-if="seccionActual === 'comparativa'"
    @volver="volver"
  )
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAlmacenInterfaz } from './almacenes/interfaz'

import Inicio from './componentes/secciones/Inicio.vue'
import Menu from './componentes/secciones/Menu.vue'
import MenuVistas360 from './componentes/secciones/MenuVistas360.vue'
import MenuInfografias from './componentes/secciones/MenuInfografias.vue'
import MenuComparativas from './componentes/secciones/MenuComparativas.vue'
import Vista360 from './componentes/secciones/Vista360.vue'
import Infografia from './componentes/secciones/Infografia.vue'
import Comparativa from './componentes/secciones/Comparativa.vue'

const almacenInterfaz = useAlmacenInterfaz()
const { seccionActual } = storeToRefs(almacenInterfaz)

function navegarSeccion(seccion: string) {
  almacenInterfaz.cambiarSeccion(seccion)
}

function volver() {
  almacenInterfaz.cambiarSeccion('menu')
}
</script>

<style lang="stylus" scoped>
.contenedor-app
  width: 100vw
  height: 100vh
  overflow: hidden
  background: #000
</style>