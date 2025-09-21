import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import { createRouter, createWebHistory } from 'vue-router'
import router from './router/router.js'

import Auth from './components/layouts/auth.vue'
app.component('Auth', Auth)



app.use(router)
app.mount('#app')
