<template lang="pug">
.vista-360.pantalla-completa
  .encabezado
    button.btn-volver(@click="$emit('volver')") ← VOLVER
    .titulo {{ vistaActual?.nombre || 'VISTA 360°' }}
  .visor
    Visor360(
      v-if="vistaActual",
      :imagenes="vistaActual.imagenes",
      :configuracion="vistaActual.configuracion"
    )
    .cargando(v-else) Cargando...
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAlmacenVistas360 } from '@/almacenes/vistas360'
import Visor360 from '@/componentes/Visor360.vue'

const emit = defineEmits<{
  (e: 'volver'): void
}>()

const almacenVistas360 = useAlmacenVistas360()
const { vistaActual } = storeToRefs(almacenVistas360)
</script>

<style lang="stylus" scoped>
.vista-360
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

.visor
  flex: 1
  display: flex
  align-items: center
  justify-content: center

.cargando
  color: #666
</style>