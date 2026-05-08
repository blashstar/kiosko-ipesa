import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import json5 from 'vite-plugin-json5'
import stylusAliasModule from 'vite-plugin-stylus-alias'
import { resolve } from 'path'

const stylusAlias = (stylusAliasModule as any).default || stylusAliasModule;

export default defineConfig({
  plugins: [vue(), json5(), stylusAlias()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@estilos': resolve(__dirname, 'src/estilos'),
      '@utiles': resolve(__dirname, 'src/utiles'),
      '@componentes': resolve(__dirname, 'src/componentes'),
      '@comun': resolve(__dirname, 'src/componentes/comun'),
      '@jd': resolve(__dirname, 'src/componentes/jd'),
    },
  },
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },

  css: {
    preprocessorOptions: {
      stylus: {
        imports: [
          resolve(__dirname, 'src/estilos/capas/_variables.styl'),
          resolve(__dirname, 'src/estilos/calculos.styl')
        ],
      },
    },
  },
})
