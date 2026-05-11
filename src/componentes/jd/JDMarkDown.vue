<template lang="pug">
  .md-content(v-if="props.markdown", v-html="html")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const props = defineProps({
  markdown: {
    type: String,
    default: '',
  },
});

const html = computed(() => md.render(props.markdown));
</script>
