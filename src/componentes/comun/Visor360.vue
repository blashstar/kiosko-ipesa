<template lang="pug">
.contenedor-visor(ref="contenedorRef")
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Viewer, utils } from '@photo-sphere-viewer/core';
import { MarkersPlugin, events } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/markers-plugin/index.css';
import type { IMarcador, IPosicion } from '@/almacenes/vistas360';
import MarkdownIt from 'markdown-it';

export interface EscenaVisor {
  id: string
  medio: string
  posicion?: IPosicion
  marcadores?: IMarcador[]
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
let cambiando = false
let rafId: number | null = null

function alSeleccionarMarcador(evt: events.SelectMarkerEvent) {
  const datos = evt.marker.data
  if (datos?.tipo === 'navegacion' && datos?.destino) {
    emit('navegar', datos.destino)
  }
}

function obtenerPosicion(escena: EscenaVisor) {
  return {
    x: escena.posicion?.x ?? 0,
    y: escena.posicion?.y ?? 0,
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

    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }

    const inicio = performance.now()
    const opacidadInicial = marcadores[0].config.opacity ?? 1

    function frame() {
      const transcurrido = performance.now() - inicio
      const progreso = Math.min(transcurrido / duracion, 1)
      const opacidad = opacidadInicial + (destino - opacidadInicial) * progreso

      marcadores.forEach((m) => {
        try {
          plugin.updateMarker({ id: m.id, opacity: opacidad })
        } catch (e) {
          // Marcador eliminado durante la animación, ignorar
        }
      })

      if (progreso < 1) {
        rafId = requestAnimationFrame(frame)
      } else {
        rafId = null
        resolve()
      }
    }

    rafId = requestAnimationFrame(frame)
  })
}

function animarZoomIn() {
  if (!visor) return

  visor.setOptions({
    mousemove: false,
    mousewheel: false,
    touchmoveTwoFingers: true,
  })

  const datos = visor.state.textureData
  const posInicial = {
    x: datos.texture.width * 0.5,
    y: datos.texture.height * 0.5
  }

  const pos = obtenerPosicion(props.escena)
  console.log({textura:datos, posInicial, pos})

  new utils.Animation({
    properties: {
      zoom: { start: 50, end: 0 },
      textureX: { start: posInicial.x, end: pos.x },
      textureY: { start: posInicial.y, end: pos.y },
      maxFov: { start: 180, end:120 },
      fisheye: { start: 2, end: 0 },
    },
    duration: 1500,
    easing: 'inSine',
    onTick: (properties: { zoom: number; fisheye: number, maxFov: number, textureX: number, textureY: number }) => {
      visor.setOptions({
          fisheye: properties.fisheye,
          maxFov: properties.maxFov,
      });
      visor.rotate({ textureX: properties.textureX, textureY: properties.textureY });
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

function mapearMarcadorPlugin(m: IMarcador): any {
  const base = {
    id: m.id,
    image: m.imagen,
    position: { textureX: m.posicion.x, textureY: m.posicion.y },
    size: { width: 64, height: 64 },
    anchor: 'bottom center',
    data: m.datos,
  }

  if (m.datos.tipo === 'navegacion') {
    return base
  }

  return {
    ...base,
    tooltip: {
      content: generarHTML(m.datos.titulo, m.datos.descripcion),
      className: 'info-tooltip',
      position: 'top',
      trigger: 'click',
    },
  }
}

const md = new MarkdownIt();

function generarHTML(titulo: string, descripcion: string) {
  return `
    <div class="titulo">${titulo}</div>
    <div class="descripcion">${md.render(descripcion)}</div>
  `;
}

function crearVisor() {
  if (!contenedorRef.value) return

  visor = new Viewer({
    container: contenedorRef.value,
    panorama: props.escena.medio,
    defaultYaw: "180deg",
    defaultPitch: "90deg",
    defaultZoomLvl: 0,
    navbar: false,
    mousewheel: true,
    mousemove: true,
    touchmoveTwoFingers: false,
    plugins: [
      [MarkersPlugin, {
        clickEventOnMarker: true,
        markers: (props.escena.marcadores || []).map(mapearMarcadorPlugin),
      }],
    ],

    lang: {
      zoom: 'Zoom',
      zoomOut: 'Alejar',
      zoomIn: 'Acercar',
      moveUp: 'Mover arriba',
      moveDown: 'Mover abajo',
      moveLeft: 'Mover izquierda',
      moveRight: 'Mover derecha',
      description: 'Descripción',
      download: 'Descargar',
      fullscreen: 'Pantalla completa',
      loading: 'Cargando...',
      menu: 'Menú',
      close: 'Cerrar',
      twoFingers: 'Usa dos dedos para navegar',
      ctrlZoom: 'Usa CTRL + scroll para hacer zoom',
      loadError: 'No se pudo cargar el panorama',
      webglError: 'Tu navegador no soporta WebGL',
    },
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
  if (!visor || cambiando) return

  cambiando = true

  try {
    if (marcadoresPlugin) {
      await animarOpacidadMarcadores(marcadoresPlugin, 0, 250)
      marcadoresPlugin.clearMarkers()
    }

    const pos = obtenerPosicion(escena)
    await visor.setPanorama(escena.medio, {
      position: { textureX: pos.x, textureY: pos.y },
    })

    if (marcadoresPlugin) {
      ;(escena.marcadores || []).forEach((m) => {
        marcadoresPlugin!.addMarker({ ...mapearMarcadorPlugin(m), opacity: 0 })
      })
      await animarOpacidadMarcadores(marcadoresPlugin, 1, 250)
    }
  } catch (error) {
    console.error('Error al cambiar panorama:', error)
  } finally {
    cambiando = false
  }
}

onMounted(() => {
  crearVisor()
})

onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
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
})
</script>

<style lang="stylus" scoped>
.contenedor-visor
  width: 100%
  height: 100%
</style>
