import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import DashboardPanel from '@/views/DashboardPanel.vue'
import Home from '@/components/dashboard/Home.vue'
import Records from '@/components/dashboard/Records.vue'
import Settings from '@/components/dashboard/Settings.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView
  },
  {
    path: '/dashboard',
    component: DashboardPanel,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'records',
        name: 'Records',
        component: Records
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.fetchUser()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth')
  } else if (authStore.isAuthenticated && to.path === '/auth') {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
