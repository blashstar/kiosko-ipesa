import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@nanoandrew4/vue3-carousel-3d/dist/style.css'
import '@photo-sphere-viewer/core/index.css'
import '@/estilos/globales.styl'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
