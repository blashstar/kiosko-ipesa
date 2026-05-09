<template lang="pug">
Kiosko(depurar)
  router-view
</template>

<script setup lang="ts">
// Componente raíz de la aplicación, envuelve toda la interfaz del kiosko
// Utiliza el componente Kiosko para el layout principal y router-view para mostrar las secciones según la ruta
import Kiosko from '@/componentes/comun/Kiosko.vue'
</script>

<style lang="stylus" scoped>
</style>
