<template>
  <div class="son">
    <h2>我是Son 组件</h2>
    <Dialog/>
  </div>
</template>

<script>
  import Dialog from './Dialog'
  export default {
      name: 'Son',
      components:{Dialog}
  }
</script>

<style>
  .son {
    background-color: orange;
    padding: 10px;
  }
</style>