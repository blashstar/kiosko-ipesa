import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './estilos/globales.styl'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')