<template>
  <h1>我是 APP组件  </h1>

  <!-- 在模板中 直接使用 setup返回值， -->
  <h2>一个人的信息： {{name}}</h2>
  <h2>一个人的年龄 ： {{age}}</h2>
  <button @click='sayHi'>执行一个函数</button>
  
  <h3>在Vue2和Vue3中定义相同的a时，以 Vue3为主 ： {{a}}</h3>

  <br>


  <!-- Vue2调用 Vue3中的数据 -->
  <h2>这是a: {{a}}</h2>
  <h2>这是Vue2的 name: {{xingming}}</h2>
  <h2>这是Vue2的 age: {{nianling}}</h2>
  <button @click='test1'>在Vue2中调用Vue3中的sayhi</button>
</template>

<script>

import {h} from 'vue'
export default {
  name: 'App',
  data () {
    return {
        a: '这是a',
        // name 和 age 都是Vue3中的数据 
        'xingming': this.name,
        'nianling': this.age
    }
  },

  methods: {
    test1() {
      this.sayHi() // 在Vue2中调用 sayhi方法
      // this.test2() //
    }
  },

  setup() {  // 定义 setup 函数， setup 为一个函数 
    
    // 定义数据 
    let name = 'Yellowsea'
    let age  = 18 
    let a = 100


    // 定义 方法 
    function sayHi() {
      alert(`我是sayhi函数, 数据是 ${name},和 ${age}`)
    }

    // 在Vue3中读取Vue2的数据时 
    function test2() {
      console.log(name),
      console.log(age),
      console.log(this.test1()) // 在Vue3中读取 Vue2的 test1 
    }

    // setup 的返回值 
    return {   // 1. 返回值是一个对象 
      name,
      age,
      sayHi,
      a,
      test2
    }

    //setup的返回值 
    // 2. 返回一个渲染函数 
    // return () => h('h2', '你好Yellowsea')
  }
} 
</script>