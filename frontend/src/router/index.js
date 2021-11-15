import Vue from 'vue'
import VueRouter from 'vue-router'
import LatentSpace from '../views/LatentSpace.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/latent',
    name: 'LatentSpace',
    component: LatentSpace
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
