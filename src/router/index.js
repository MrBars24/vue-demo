import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import MainLayout from '@/components/templates/layouts/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/contact-us',
          name: 'ContactUs',
          component: () => import('../views/ContactUsView.vue')
        }
      ]
    }
  ]
})

export default router
