import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Setting from '../views/SettingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    }
  ]
})

export default router
