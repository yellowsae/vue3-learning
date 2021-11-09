<template>
  <button @click='msg = !msg'>显示/隐藏</button>
  <Demo v-if='msg' /> 
</template>
<script>
  import Demo from './components/Demo.vue'
  import {ref} from 'vue'
export default {
  name: 'App',
  components: {Demo},
  setup() {
    let msg = ref(true)
    return {
      msg
    }
  }
} 
</script>