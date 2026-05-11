<template lang="pug">
.jd-texto(ref="elementoTexto")
  slot
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated, nextTick } from 'vue';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const props = defineProps({
  delay: {
    type: Number,
    default: 0.1,
  },
});

const elementoTexto = ref<HTMLElement | null>(null);
let splitInstances: SplitText[] = [];

function revertSplits() {
  splitInstances.forEach(split => split.revert());
  splitInstances = [];
}

function obtenerElementosParaAnimar(contenedor: HTMLElement): HTMLElement[] {
  const selectores = 'p, li, h1, h2, h3, h4, h5, h6, blockquote, pre, dt, dd';

  const candidatos = Array.from(contenedor.querySelectorAll(selectores))
    .filter(el => el.textContent?.trim()) as HTMLElement[];

  // Quedarse solo con las hojas: elementos que no contienen otros candidatos
  const hojas = candidatos.filter(el => el.querySelectorAll(selectores).length === 0);

  if (hojas.length > 0) {
    return hojas;
  }

  // Fallback: animar el contenedor mismo si tiene texto directo
  if (contenedor.textContent?.trim()) {
    return [contenedor];
  }

  return [];
}

function animarLineas(lineas: HTMLElement[] | null | undefined) {
  if (!lineas || lineas.length === 0) return;

  gsap.set(lineas, {
    opacity: 0,
    y: 40,
    rotationX: -45,
  });

  gsap.to(lineas, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.08,
    delay: props.delay,
  });
}

function animarEntrada() {
  if (!elementoTexto.value) return;

  revertSplits();

  nextTick(() => {
    const elementos = obtenerElementosParaAnimar(elementoTexto.value!);

    if (elementos.length === 0) return;

    const todasLasLineas: HTMLElement[] = [];

    elementos.forEach(el => {
      const split = new SplitText(el, { type: 'lines' });
      splitInstances.push(split);

      if (split.lines) {
        todasLasLineas.push(...split.lines);
      }
    });

    animarLineas(todasLasLineas);
  });
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => animarEntrada(), 50);
  });
});

onActivated(() => {
  nextTick(() => {
    setTimeout(() => animarEntrada(), 50);
  });
});
</script>

<style lang="stylus" scoped>
.jd-texto
  text-wrap: balance
  word-break: normal
  line-height 1.2
  perspective 600px
</style>
