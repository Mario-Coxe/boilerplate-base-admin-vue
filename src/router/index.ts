import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'dashboard' },
  },
  {
    name: 'admin',
    path: '/',
    component: AppLayout,
    redirect: { name: 'dashboard' },
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../pages/admin/dashboard/Dashboard.vue'),
      },

      {
        name: 'users',
        path: 'users',
        component: () => import('../pages/Modules/luggage/table/Luggage.vue'),
      },
      {
        name: 'projects',
        path: 'projects',
        component: () => import('../pages/Modules/colors/table/Colors.vue'),
      },
      {
        name: 'driver',
        path: 'driver',
        component: () => import('../pages/Modules/drivers/table/Driver.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      window.scrollTo(0, 0)
    }
  },
  routes,
})

export default router
