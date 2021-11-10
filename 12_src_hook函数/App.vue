<template>
  <button @click='msg = !msg'>显示/隐藏</button>
  <Demo v-if='msg' /> 

  <br>

  <Test />
</template>
<script>
  import Demo from './components/Demo.vue'
  import Test from './components/Test.vue'

  import {ref} from 'vue'
export default {
  name: 'App',
  components: {Demo,Test},
  setup() {
    let msg = ref(true)
    return {
      msg
    }
  }
} 
</script>