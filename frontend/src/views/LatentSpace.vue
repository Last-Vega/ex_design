<template>
  <div>
    <DisplayLatentSpace />
    <Instraction />
  </div>
</template>

<script>
import DisplayLatentSpace from '@/components/displayLatentInfo'
import Instraction from '../components/instraction.vue'
export default {
  name: 'LatentSpace',
  components: {
    DisplayLatentSpace,
    Instraction
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
