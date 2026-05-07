<template lang="pug">
.pantalla-inicio.pantalla-completa
  .contenido
    .logo
      img(src="/img/logo.png" alt="IPESA" v-if="logoExiste")
      .logo-texto(v-else) IPESA
    .titulo KIOSCO INTERACTIVO
    .btn-iniciar(@click="irAMenu") TOCA PARA INICIAR
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
  (e: 'navegar', seccion: string): void
}>()

const logoExiste = ref(true)

function irAMenu() {
  emit('navegar', 'menu')
}

onMounted(() => {
  const img = new Image()
  img.onload = () => {
    logoExiste.value = true
  }
  img.onerror = () => {
    logoExiste.value = false
  }
  img.src = '/img/logo.png'
})
</script>

<style lang="stylus" scoped>
.pantalla-inicio
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)

.contenido
  text-align: center

.logo
  margin-bottom: 2rem

.logo img
  width: 200px
  height: auto

.logo-texto
  font-size: 3rem
  font-weight: bold
  color: #00ff88
  letter-spacing: 0.5em

.titulo
  font-size: 1.5rem
  margin-bottom: 4rem
  opacity: 0.7

.btn-iniciar
  padding: 1rem 3rem
  border: 2px solid #00ff88
  background: transparent
  color: #00ff88
  font-size: 1.2rem
  cursor: pointer
  transition: all 0.3s ease
  animation: pulse 2s infinite

  &:hover
    background: #00ff88
    color: #0a0a0a
</style>