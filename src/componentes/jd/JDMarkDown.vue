<template lang="pug">
  .md-content(ref="mdContentRef", v-if="props.markdown", v-html="html")
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onActivated } from 'vue';
import MarkdownIt from 'markdown-it';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const md = new MarkdownIt();

const props = defineProps({
  markdown: {
    type: String,
    default: '',
  },
});

const html = computed(() => md.render(props.markdown));
const mdContentRef = ref<HTMLElement | null>(null);
let splitTextInstance: SplitText | null = null;

function animarEntrada() {
  nextTick(() => {
    if (!mdContentRef.value) return;

    if (splitTextInstance) {
      splitTextInstance.revert();
    }

    splitTextInstance = new SplitText(mdContentRef.value, {
      type: 'lines',
      linesClass: 'linea-markdown',
    });

    const lineas = splitTextInstance.lines;
    if (!lineas || lineas.length === 0) return;

    gsap.set(lineas, {
      opacity: 0,
      y: 20,
    });

    gsap.to(lineas, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.15,
    });
  });
}

onMounted(() => {
  // animarEntrada();
});

onActivated(() => {
  animarEntrada();
});


watch(() => props.markdown, () => {
  animarEntrada();
});
</script>

<style lang="stylus" scoped>
.md-content
  :deep(.linea-markdown)
    display block
    will-change transform, opacity
</style>
