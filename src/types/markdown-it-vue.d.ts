declare module 'markdown-it-vue' {
  import { DefineComponent } from 'vue';

  interface MarkdownItVueProps {
    content: string;
    tag?: string;
    class?: string | string[] | Record<string, boolean>;
  }

  const MarkdownItVue: DefineComponent<MarkdownItVueProps, {}, any>;

  export default MarkdownItVue;
}
