<template lang="pug">
Kiosko(depurar)
  router-view(v-slot="{ Component }")
    Transition(:css="false" @before-enter="antesEntrar" @enter="alEntrar" @leave="alSalir")
      KeepAlive
        component(:is="Component" :key="$route.path")
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import Kiosko from '@/componentes/comun/Kiosko.vue';

function antesEntrar(el: Element) {
  gsap.set(el, {
    opacity: 0,
    scale: 0.96,
    y: 30,
  });
}

function alEntrar(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.5,
    ease: 'power3.out',
    onComplete: done,
  });
}

function alSalir(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 0,
    scale: 1.02,
    y: -20,
    duration: 0.35,
    ease: 'power2.in',
    onComplete: done,
  });
}
</script>

<style lang="stylus" scoped>
</style>
