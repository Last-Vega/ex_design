import Vue from 'vue'
import VueRouter from 'vue-router'
import LatentSpace from '../views/LatentSpace.vue'
// import Login from '../views/Login.vue'
import LatentIto from '../views/LatentIto.vue'
import LatentMori from '../views/LatentMori.vue'
import LatentMatsu from '../views/LatentMatsu.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/latent',
    name: 'LatentSpace',
    component: LatentSpace
  },
  {
    path: '/ito',
    name: 'Ito',
    component: LatentIto
  },
  {
    path: '/mori',
    name: 'Mori',
    component: LatentMori
  },
  {
    path: '/matsu',
    name: 'Matsu',
    component: LatentMatsu
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
