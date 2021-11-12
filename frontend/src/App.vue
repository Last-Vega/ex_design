<template>
  <div>
    <!-- <div v-if="isLogin"> 
      <LatentSpace />
    </div>
    <div v-else>

    </div> -->
    <LatentSpace />
  </div>
</template>

<script>
import LatentSpace from './views/LatentSpace.vue'
export default {
  name: 'App',
  components: {
    LatentSpace
  },
  data() {
    return {
      isLogin: false
    }
  },
  methods: {}
}
</script>
