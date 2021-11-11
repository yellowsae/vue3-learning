<template>
  <div class="son">
    <h2>我是Son 组件 -- {{name}} --- {{price}} </h2>
  </div>
</template>

<script>
  // inject 使用 inject 接收祖代传递的数据 
  import {inject,toRefs} from 'vue'
  export default {
      name: 'Son',
      setup() {
        
        // 使用方法 inject('cat') ，接收组代 provide() 定义的数据 
        let cat = inject('cat')  
        console.log(cat)
        return {...toRefs(cat)}
      }
  }
</script>

<style>
  .son {
    background-color: orange;
    padding: 10px;
  }
</style>