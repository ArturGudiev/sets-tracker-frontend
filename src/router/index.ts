import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SetAdd from '@/components/SetAdd.vue'
import BigSetAdd from '@/components/BigSetAdd.vue'
import BigSetCard from '@/components/BigSetCard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sets/add',
      name: 'setAdd',
      component: SetAdd,
    },

    {
      path: '/big-sets/add',
      name: 'bigSetAdd',
      component: BigSetAdd,
    },
    {
      path: '/big-sets/:id',
      name: 'bigSetCard',
      component: BigSetCard,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
