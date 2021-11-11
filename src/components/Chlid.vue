<template>
  <div class="chlid">
    <h2>我是Child 组件 {{name}} ---  {{price}} </h2>
    <Son />
  </div>
</template>

<script>
  import {inject,toRefs} from 'vue'
  import Son from './Son.vue'
  export default {
      name: 'Chlid',
      components : {Son},
      setup() {
        return {...toRefs(
          inject('cat')
        )}
      }
  }
</script>

<style>
  .chlid {
    background-color:skyblue;
    padding: 10px;
  }
</style>