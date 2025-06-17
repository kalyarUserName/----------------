import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { NConfigProvider } from 'naive-ui'

const app = createApp(App)
app.component('NConfigProvider', NConfigProvider)

app.use(createPinia())
app.use(router)

app.mount('#app')
