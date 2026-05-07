import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import json5 from 'vite-plugin-json5'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), json5()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
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
})