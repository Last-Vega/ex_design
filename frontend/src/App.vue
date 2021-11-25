<template>
  <v-app>
    <v-main>
      <router-view />
      <br />
      <v-container class="grey lighten-5">
        <router-link to="/mori">森嶋先生</router-link><br /><br />
        <router-link to="/matsu">松原先生</router-link><br /><br />
        <router-link to="/ito">伊藤先生</router-link><br /><br />
      </v-container>
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
  data () {
    return {
      // isLogin: this.$store.state.loginState.isLogin
    }
  },
  methods: {}
}
</script>
