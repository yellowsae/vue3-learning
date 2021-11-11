<template>
  <div class="chlid">
    <h2>我是Child 组件</h2>
    <Son />
  </div>
</template>

<script>
  import Son from './Son.vue'
  export default {
      name: 'Chlid',
      components : {Son},
  }
</script>

<style>
  .chlid {
    background-color:skyblue;
    padding: 10px;
  }
</style>