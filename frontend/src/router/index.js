import Vue from 'vue'
import VueRouter from 'vue-router'
import LatentSpace from '../views/LatentSpace.vue'
// import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/ito',
    name: 'Ito',
    component: LatentSpace
  },
  {
    path: '/mori',
    name: 'Mori',
    component: LatentSpace
  },
  {
    path: '/matsu',
    name: 'Matsu',
    component: LatentSpace
  },
  {
    path: '/tutorial',
    name: 'tutorial',
    component: LatentSpace
  },
  {
    path: '/suzu',
    name: 'Suzu',
    component: LatentSpace
  },
  {
    path: '/waka',
    name: 'Waka',
    component: LatentSpace
  },
  {
    path: '/hira',
    name: 'hira',
    component: LatentSpace
  },
  {
    path: '/ono',
    name: 'ono',
    component: LatentSpace
  },
  {
    path: '/kato',
    name: 'kato',
    component: LatentSpace
  },
  {
    path: '/yu',
    name: 'yu',
    component: LatentSpace
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
