import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PageView from '@/views/PageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:page',
      name: 'page',
      component: PageView,
      props: true,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageView },
  ],
})

export default router
