<template lang="pug">
.jd-titulo(ref="elementoTitulo")
  slot
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const elementoTitulo = ref<HTMLElement | null>(null);
let splitTextInstance: SplitText | null = null;

function animarEntrada() {
  if (!elementoTitulo.value) return;

  // Limpiar instancia anterior si existe
  if (splitTextInstance) {
    splitTextInstance.revert();
  }

  // Crear nueva división por palabras
  splitTextInstance = new SplitText(elementoTitulo.value, {
    type: 'words',
    wordsClass: 'palabra-titulo',
  });

  const palabras = splitTextInstance.words;
  if (!palabras || palabras.length === 0) return;

  // Estado inicial: palabras invisible y desplazadas hacia abajo
  gsap.set(palabras, {
    opacity: 0,
    y: 40,
    rotationX: -45,
  });

  // Animación escalonada de entrada
  gsap.to(palabras, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.08,
    delay: 0.1,
  });
}

onMounted(() => {
  nextTick(() => {
    animarEntrada();
  });
});

// Re-animar cuando cambie el contenido del slot
watch(
  () => elementoTitulo.value?.textContent,
  () => {
    nextTick(() => {
      animarEntrada();
    });
  },
  { flush: 'post' }
);
</script>

<style lang="stylus" scoped>
.jd-titulo
  text-wrap: balance
  word-break: normal
  line-height 1.2
  perspective 600px

  :deep(.palabra-titulo)
    display inline-block
    will-change transform, opacity
    transform-style preserve-3d
</style>
