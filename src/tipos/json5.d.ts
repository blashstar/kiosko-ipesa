// Declaraciones de tipo para archivos JSON5 importados en el proyecto.
// El plugin vite-plugin-json5 transforma estos archivos a módulos JS en build time.

declare module '*.json5' {
  const value: any
  export default value
}
