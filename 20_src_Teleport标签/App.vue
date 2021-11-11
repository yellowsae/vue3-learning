<template>
  <div class="app">
    <h2>我是App 组件</h2>
    <Chlid />
  </div>
</template>
<script>
  import Chlid from './components/Chlid.vue'
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