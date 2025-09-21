import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import { createRouter, createWebHistory } from 'vue-router'
import router from './router/router.js'

import Auth from './components/layouts/auth.vue'
app.component('Auth', Auth)

// app.config.globalProperties.$api = 'http://localhost:3000/api';
// app.config.globalProperties.$backend = 'http://localhost:3000';
app.config.globalProperties.$api = import.meta.env.VITE_BACKEND_URL + '/api';
app.config.globalProperties.$backend = import.meta.env.VITE_BACKEND_URL;


app.use(router)
app.mount('#app')
