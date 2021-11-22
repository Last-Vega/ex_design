<template>
  <v-app>
    <v-main>
      <router-view />
      <router-link to="/latent">Go to latent</router-link>
    </v-main>
  </v-app>
</template>

<script>
// import LatentSpace from './views/LatentSpace.vue'
// import Login from './views/Login.vue'
export default {
  name: 'App',
  components: {
    // LatentSpace,
    // Login
  },
  data() {
    return {
      // isLogin: this.$store.state.loginState.isLogin
    }
  },
  methods: {}
}
</script>
