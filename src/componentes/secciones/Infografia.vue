<template lang="pug">
.infografia.pantalla-completa
  .encabezado
    button.btn-volver(@click="volver") ← VOLVER
    .titulo {{ infografiaActual?.titulo || 'INFOGRAFÍA' }}
  .contenido
    img(:src="infografiaActual?.imagen" :alt="infografiaActual?.titulo" v-if="infografiaActual")
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAlmacenContenidos } from '@/almacenes/contenidos'

const router = useRouter()
const almacenContenidos = useAlmacenContenidos()
const { infografiaActual } = storeToRefs(almacenContenidos)

function volver() {
  router.push({ name: 'menu-infografias' })
}
</script>

<style lang="stylus" scoped>
.infografia
  display: flex
  flex-direction: column
  background: #0a0a0a
  padding: 2rem

.encabezado
  display: flex
  align-items: center
  gap: 2rem
  margin-bottom: 2rem

.btn-volver
  padding: 0.8rem 1.5rem
  background: transparent
  border: 1px solid #00ff88
  color: #00ff88
  cursor: pointer
  font-size: 1rem

.titulo
  font-size: 1.8rem
  color: #00ff88

.contenido
  flex: 1
  display: flex
  align-items: center
  justify-content: center

  img
    max-width: 100%
    max-height: 100%
    object-fit: contain
</style>