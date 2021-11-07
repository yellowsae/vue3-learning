<template>
  <h1>我是 APP组件  </h1>

  <!-- 在模板中 直接使用 setup返回值， -->
  <h2>一个人的信息： {{name}}</h2>
  <h2>一个人的年龄 ： {{age}}</h2>
  <h3>工作类型: {{obj.type}}</h3>
  <h3>工资: {{obj.salary}}</h3>
  <button @click='changeInfo'>点击修改信息</button>
</template>

<script>

// 使用 ref 函数,动态修改模板 

//引入 ref 函数 
import {ref} from 'vue'
export default {
  name: 'App',
  setup() { 
    // 让数据变为响应式 
    // 使用 ref 函数  
    let name = ref('Yellowsea')
    let age  = ref(18)
    let obj = ref({
      type: '前端',
      salary: '30k'
    })
    function changeInfo() {
      // 修改数据 
      name.value = 'Hide',
      age.value =  19,
      obj.value.type = 'UI工程师',
      obj.value.salary = '50k',
      console.log(obj.value)
    }
    return {   
      name,
      age,
      changeInfo,
      obj
    }

    //setup的返回值 
    // 2. 返回一个渲染函数 
    // return () => h('h2', '你好Yellowsea')
  }
} 
</script>