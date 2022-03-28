import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favourite from '../views/Favourite.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Favourite',
    name: 'Favourite',
    component: Favourite
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
