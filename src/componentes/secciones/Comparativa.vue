<template lang="pug">
.comparativa.pantalla-completa
  .encabezado
    button.btn-volver(@click="volver") ← VOLVER
    .titulo {{ comparativaActual?.titulo || 'COMPARATIVA' }}
  .contenido
    .productos(v-if="comparativaActual")
      .producto
        img(:src="comparativaActual.producto1.imagen" :alt="comparativaActual.producto1.nombre")
        .nombre {{ comparativaActual.producto1.nombre }}
      .vs VS
      .producto
        img(:src="comparativaActual.producto2.imagen" :alt="comparativaActual.producto2.nombre")
        .nombre {{ comparativaActual.producto2.nombre }}
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAlmacenComparativas } from '@/almacenes/comparativas'

const router = useRouter()
const almacenComparativas = useAlmacenComparativas()
const { comparativaActual } = storeToRefs(almacenComparativas)

function volver() {
  router.push({ name: 'menu-comparativas' })
}
</script>

<style lang="stylus" scoped>
.comparativa
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
  gap: 4rem

.productos
  display: flex
  align-items: center
  gap: 4rem

.producto
  display: flex
  flex-direction: column
  align-items: center

  img
    max-width: 400px
    object-fit: contain

  .nombre
    margin-top: 1rem
    font-size: 1.2rem

.vs
  font-size: 2rem
  color: #00ff88
  font-weight: bold
</style>