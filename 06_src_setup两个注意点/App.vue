<template>
  <!--  传递参数 -->
  <Demo @hello='sayHellofunction' msg='你好啊' hello='Yellowsea '> 
    <template v-slot:qqq>
        <span>你好</span>
    </template>
  </Demo>
</template>
<script>
  import Demo from './components/Demo.vue'
export default {
  name: 'App',
  components: {Demo},
  setup() {
    // 定义自定义事件 
    function sayHellofunction(value) {
      alert('有人触发了自定义事件sayHellofunction： 收到的参数：' + value)
    }
    return {
      sayHellofunction
    }
  }
} 
</script>