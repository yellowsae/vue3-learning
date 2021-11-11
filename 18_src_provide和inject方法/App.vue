<template>
  <div class="app">
    <h2>我是App 组件 {{name}} ---- {{price}}</h2>
    <Chlid />
  </div>
</template>

<script>
  // 使用 provide 给 App的后代组件传递数据 
  import Chlid from './components/Chlid.vue'
  import Son from './components/Son.vue'
  import {toRefs, reactive, provide} from 'vue'
  export default {
      name: 'App',
      components : {
        Chlid,
        Son
      },
      setup() {
        let cat = reactive({name : '奔驰',price: '40W'})
        // provide 的使用方法
        provide('cat', cat)  // 接收连个参数， 一个是定义的名字，和需要传递的参数 
        return {
          ...toRefs(cat)
        }
      }
  }
</script>

<style>
  .app {
    background-color: gray;
    padding: 10px;
  }
</style>