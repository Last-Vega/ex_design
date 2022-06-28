<template>
  <v-app>
    <v-main>
      <router-view />
      <br />
      <v-container class="grey lighten-5">
        <!-- <router-link to="/mori">森嶋先生</router-link><br /><br />
        <router-link to="/matsu">松原先生</router-link><br /><br />
        <router-link to="/ito">伊藤先生</router-link><br /><br />
        <router-link to="/kim">Kim先生</router-link><br /><br />
        <router-link to="/waka">若林先生</router-link><br /><br />
        <router-link to="/suzu">鈴木先生</router-link><br /><br />
        <router-link to="/hira">平木先生</router-link><br /><br />
        <router-link to="/ono">小野先生</router-link><br /><br /> -->
        <!-- <router-link to="/kato">加藤先生</router-link><br /><br /> -->
        <router-link to="/yu">宇先生</router-link><br /><br />
        <router-link to="/tutorial">チュートリアル</router-link><br /><br />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>
