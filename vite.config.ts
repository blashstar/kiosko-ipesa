import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import json5 from 'vite-plugin-json5'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), json5()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@estilos': resolve(__dirname, 'src/estilos'),
      '@utiles': resolve(__dirname, 'src/utiles'),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     stylus: {},
  //   },
  // },
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
})
