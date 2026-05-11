declare module 'markdown-it' {
  class MarkdownIt {
    constructor();
    render(src: string): string;
  }
  export default MarkdownIt;
}
