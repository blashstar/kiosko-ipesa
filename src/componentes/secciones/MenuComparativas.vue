<template lang="pug">
.menu-comparativas.pantalla-completa
  .encabezado
    button.btn-volver(@click="volver") ← VOLVER
    .titulo COMPARATIVAS
  .lista-items
    .item(
      v-for="comp in comparativas",
      :key="comp.id",
      @click="seleccionarComparativa(comp)"
    )
      .imagen-item
        img(:src="comp.imagen" :alt="comp.titulo")
      .nombre-item {{ comp.titulo }}
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAlmacenComparativas } from '@/almacenes/comparativas'

const router = useRouter()
const almacenComparativas = useAlmacenComparativas()
const { comparativas } = storeToRefs(almacenComparativas)

function seleccionarComparativa(comp: any) {
  almacenComparativas.seleccionarComparativa(comp.id)
  router.push({ name: 'comparativa' })
}

function volver() {
  router.push({ name: 'menu' })
}
</script>

<style lang="stylus" scoped>
.menu-comparativas
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

.lista-items
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
  gap: 2rem
  overflow-y: auto
  flex: 1

.item
  display: flex
  flex-direction: column
  align-items: center
  padding: 1rem
  border: 1px solid #333
  cursor: pointer
  transition: all 0.3s ease

  &:hover
    border-color: #00ff88
    transform: scale(1.05)

.imagen-item img
  width: 100%
  aspect-ratio: 16/9
  object-fit: cover

.nombre-item
  margin-top: 0.5rem
  font-size: 1rem
  text-align: center
</style>