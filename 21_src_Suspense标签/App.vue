<template>
  <div class="app">
    <h2>我是App 组件</h2>
    <Suspense>
      <!--  内置了两个插槽  --> 
      <!-- 1. 是 define 的， 默认的 ， 展示你要展示的内容 
          2. 是当组件在 加载时候， 要展示的提示内容  -->

          <!-- 需要使用v-slot 指明放入那个插槽中 default 默认展示的   fallback 正在加载的 
              default 和 fallback 不允许修改 ，官方定义的-->
          <template v-slot:default>  
            <Chlid />
          </template>
          <template v-slot:fallback>
            <h2>正在加载中 ..........</h2>
          </template>
    </Suspense>
  </div>
</template>
<script>
  // import Chlid from './components/Chlid.vue'  // 静态引入组件 
  import {defineAsyncComponent} from 'vue'   // defineAsyncComponent 引入动态组件API 
  const Chlid = defineAsyncComponent(() => import('./components/Chlid'))   // 动态引入组件 
  // 出现的情况 ： 当网速慢时候，先出现 APP组件，然后再出现 Chlid
  export default {
      name: 'App',
      components : {
        Chlid,
      },
  }
</script>
<style>
  .app {
    background-color: gray;
    padding: 10px;
  }
</style>