<template lang="pug">
.pantalla-menu.pantalla-completa
  .titulo-menu SELECCIONA UNA OPCIÓN
  .opciones-menu
    .opcion(@click="irAVistas360")
      .icono 📷
      .texto VISTAS 360°
    .opcion(@click="irAInfografias")
      .icono 📊
      .texto INFOGRAFÍAS
    .opcion(@click="irAComparativas")
      .icono ⚖️
      .texto COMPARATIVAS
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'navegar', seccion: string): void
}>()

function irAVistas360() {
  emit('navegar', 'menu-vistas-360')
}

function irAInfografias() {
  emit('navegar', 'menu-infografias')
}

function irAComparativas() {
  emit('navegar', 'menu-comparativas')
}
</script>

<style lang="stylus" scoped>
.pantalla-menu
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)
  padding: 2rem

.titulo-menu
  font-size: 1.5rem
  margin-bottom: 3rem
  color: #00ff88

.opciones-menu
  display: flex
  flex-direction: column
  gap: 2rem

.opcion
  display: flex
  align-items: center
  gap: 1.5rem
  padding: 1.5rem 3rem
  border: 2px solid #333
  background: rgba(255, 255, 255, 0.05)
  cursor: pointer
  transition: all 0.3s ease
  min-width: 300px

  &:hover
    border-color: #00ff88
    background: rgba(0, 255, 136, 0.1)

.icono
  font-size: 2rem

.texto
  font-size: 1.3rem
</style>