<template lang="pug">
.contenedor-visor(ref="contenedorRef")
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Viewer, utils } from '@photo-sphere-viewer/core';
import { MarkersPlugin, events } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/markers-plugin/index.css';

export interface EscenaVisor {
  id: string
  medio: string
  posicionInicial?: { yaw: number; pitch: number }
  marcadores?: any[]
}

const props = defineProps<{
  escena: EscenaVisor
}>()

const emit = defineEmits<{
  navegar: [destino: string]
}>()

const contenedorRef = ref<HTMLDivElement | null>(null)
let visor: Viewer | null = null
let marcadoresPlugin: MarkersPlugin | null = null

function alSeleccionarMarcador(evt: events.SelectMarkerEvent) {
  const destino = evt.marker.data?.escenaDestino
  if (destino) {
    emit('navegar', destino)
  }
}

function obtenerPosicion(escena: EscenaVisor) {
  return {
    yaw: escena.posicionInicial?.yaw ?? 0,
    pitch: escena.posicionInicial?.pitch ?? 0,
  }
}

function animarOpacidadMarcadores(
  plugin: MarkersPlugin,
  destino: number,
  duracion: number = 300
): Promise<void> {
  return new Promise((resolve) => {
    const marcadores = plugin.getMarkers()
    if (marcadores.length === 0) {
      resolve()
      return
    }

    const inicio = performance.now()
    const opacidadInicial = marcadores[0].config.opacity ?? 1

    function frame() {
      const transcurrido = performance.now() - inicio
      const progreso = Math.min(transcurrido / duracion, 1)
      const opacidad = opacidadInicial + (destino - opacidadInicial) * progreso

      marcadores.forEach((m) => {
        plugin.updateMarker({ id: m.id, opacity: opacidad })
      })

      if (progreso < 1) {
        requestAnimationFrame(frame)
      } else {
        resolve()
      }
    }

    requestAnimationFrame(frame)
  })
}

function animarZoomIn() {
  if (!visor) return

  visor.setOptions({
    mousemove: false,
    mousewheel: false,
    touchmoveTwoFingers: true,
  })

  const pos = obtenerPosicion(props.escena)

  new utils.Animation({
    properties: {
      zoom: { start: 50, end: 0 },
      yaw: { start: 0, end: pos.yaw },
      pitch: { start: 0, end: pos.pitch },
      maxFov: { start: 180, end:120 },
      fisheye: { start: 2, end: 0 },
    },
    duration: 1500,
    easing: 'inSine',
    onTick: (properties: { zoom: number; fisheye: number, maxFov: number, yaw: number, pitch: number }) => {
      visor.setOptions({
          fisheye: properties.fisheye,
          maxFov: properties.maxFov,
      });
      visor.rotate({ yaw: properties.yaw, pitch: properties.pitch });
      visor?.zoom(properties.zoom)
      // visor?.setFisheye(properties.fisheye)

    },
  }).then(() => {
    visor?.setOptions({
      mousemove: true,
      mousewheel: true,
      touchmoveTwoFingers: false,
    })
  })
}

function crearVisor() {
  if (!contenedorRef.value) return

  const pos = obtenerPosicion(props.escena)

  visor = new Viewer({
    container: contenedorRef.value,
    panorama: props.escena.medio,
    defaultYaw: pos.yaw,
    defaultPitch: pos.pitch,
    defaultZoomLvl: 0,
    navbar: false,
    mousewheel: true,
    mousemove: true,
    touchmoveTwoFingers: false,
    plugins: [
      [MarkersPlugin, {
        clickEventOnMarker: true,
        markers: props.escena.marcadores || [],
      }],
    ],
  })

  visor.addEventListener('ready', () => {
    animarZoomIn()
  }, { once: true })

  marcadoresPlugin = visor.getPlugin(MarkersPlugin) || null
  if (marcadoresPlugin) {
    marcadoresPlugin.addEventListener('select-marker', alSeleccionarMarcador)
  }
}

async function cambiarPanorama(escena: EscenaVisor) {
  if (!visor) return

  if (marcadoresPlugin) {
    await animarOpacidadMarcadores(marcadoresPlugin, 0, 250)
    marcadoresPlugin.clearMarkers()
  }

  const pos = obtenerPosicion(escena)
  await visor.setPanorama(escena.medio, {
    position: { yaw: pos.yaw, pitch: pos.pitch },
  })

  if (marcadoresPlugin) {
    ;(escena.marcadores || []).forEach((m) => {
      marcadoresPlugin!.addMarker({ ...m, opacity: 0 })
    })
    await animarOpacidadMarcadores(marcadoresPlugin, 1, 250)
  }
}

onMounted(() => {
  crearVisor()
})

onUnmounted(() => {
  if (marcadoresPlugin) {
    marcadoresPlugin.removeEventListener('select-marker', alSeleccionarMarcador)
    marcadoresPlugin = null
  }
  visor?.destroy()
  visor = null
})

watch(() => props.escena, (nueva) => {
  if (visor) {
    cambiarPanorama(nueva)
  } else {
    crearVisor()
  }
}, { deep: true })
</script>

<style lang="stylus" scoped>
.contenedor-visor
  width: 100%
  height: 100%
</style>
