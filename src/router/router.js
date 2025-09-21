import { createRouter, createWebHistory } from 'vue-router'

import addProducts from '../components/pages/addProducts.vue'
import Products from '../components/pages/products.vue'
import Profits from '../components/pages/profit.vue'
import Statements from '../components/pages/statements.vue'
import Notifications from '../components/pages/notifications.vue'
import Help from '../components/pages/help.vue'
import productInfo from '../components/pages/productInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        redirect: '/products'
    },
    {
        path: '/products',
        name: 'products',
        component: Products
    },
    {
        path: '/addProducts',
        name: 'addProducts',
        component: addProducts
    },
    {
        path: '/productInfo/:id',
        name: 'productInfo',
        component: productInfo
    },
    {
        path: '/profits',
        name: 'profits',
        component: Profits
    },
    {
        path: '/statements',
        name: 'statements',
        component: Statements
    },
    {
        path: '/notifications',
        name: 'notifications',
        component: Notifications
    },
    {
        path: '/help',
        name: 'help',
        component: Help
    },
    {
        path: '/receipt/:id',
        name: 'receipt',
        component: () => import('../components/pages/receipt.vue')
    },
    {
        path: '/reports',
        name: 'reports',
        component: () => import('../components/pages/reports.vue')
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('../components/pages/settings.vue')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../components/pages/test.vue')
    }
  ],
  linkActiveClass: 'active-link'
})

export default router