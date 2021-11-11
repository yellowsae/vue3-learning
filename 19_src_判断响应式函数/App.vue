<template>
  <div class="app">
    <h2>我是App 组件</h2>
  </div>
</template>

<script>
  import {toRefs, reactive,ref,readonly,isRef,isReactive,isProxy,isReadonly} from 'vue'
  export default {
      name: 'App',
      setup() {
        let cat = reactive({name : '奔驰',price: '40W'})
        let sum = ref(0)
        let cat2 = ref({name : '奔驰',price: '40W'})
        let test = readonly(cat)


        console.log(isRef(sum))  //true 
        console.log(isReactive(cat))  // true
        console.log(isReadonly(test)) // true
        console.log(isProxy(cat2))  // false 
        console.log(isProxy(cat)) // true

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