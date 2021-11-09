<template>
  <v-app>
    <v-container>
      <ChatBoard/>
    </v-container>
  </v-app>
</template>

<script>
  import ChatBoard from './components/ChatBoard'

  export default {
    name: 'App',
    components: {
      ChatBoard
    },
  }
</script>