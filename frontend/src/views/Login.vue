<template>
  <v-app>
    <v-card>
      <div v-if="message != undefined" class="message">{{ message }}</div>
      <v-card-title> ユーザー情報を入力してください </v-card-title>
      <v-card-text>
        <v-text-field v-model="user.myToken" label="指定された文字列">
        </v-text-field>
        <br />
        <v-text-field
          type="password"
          append-icon="mdi-eye-off"
          v-model="user.password"
          label="パスワード"
        >
        </v-text-field>
        <br />
      </v-card-text>
      <v-card-actions>
        <v-btn text v-on:click="canLogin"> ログイン </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import { db } from '@/plugins/firebase'
export default {
  name: 'LoginUser',
  props: {
    message: String
  },
  components: {},
  data: function () {
    return {
      user: {
        myToken: '',
        password: ''
      },
      validationMessage: {
        aboutPassword: ''
      }
    }
  },
  methods: {
    async canLogin () {
      if (!this.user.myToken) {
        alert('指定された文字列を入力してください')
      } else if (!this.user.password) {
        alert('パスワードを入力してください')
      }

      // const self = this
      // パスワードのハッシュ化
      // const uint8 = new TextEncoder().encode(this.user.password)
      // const digest = await crypto.subtle.digest('SHA-256', uint8)
      // const hashPassword = Array.from(new Uint8Array(digest))
      //   .map(v => v.toString(16).padStart(2, '0'))
      //   .join('')
      db.collection('users')
        .where('pass', '==', this.user.password)
        .get()
        .then(querySnapshot => {
          console.log(querySnapshot)
          querySnapshot.forEach(doc => {
            if (doc.data().pass === this.user.password) {
              console.log(doc.data().pass)
              console.log(this.user.password)
              console.log(doc.data())
              this.$store.commit('updateLoginState', doc.data())
              this.$router.push('/latent')
            }
          })
        })
      // if (pass === hashPassword) {
      //   return this.$store.commit('updateLoginState',
      // }
    }
  }
}
</script>

<style scoped>
.message {
  color: red;
}
</style>
