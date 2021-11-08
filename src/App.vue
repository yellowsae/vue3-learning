<template>
  <h1>我是 APP组件  </h1>

  <!-- 在模板中 直接使用 setup返回值， -->
  <h2 v-show='person.name'>一个人的信息： {{person.name}}</h2>
  <h2>一个人的年龄 ： {{person.age}}</h2>
  <h2 v-show='person.sex'>一个人的性别为 ： {{person.sex}}</h2>
  <h3>工作类型: {{person.type}}</h3>
  <h3>工资: {{person.salary}}</h3>
  <h3>测试c的值为 : {{person.a.b.c}}</h3>
  <h3>测试的数组: {{person.arr}}</h3>
  <button @click='changeInfo'>点击修改信息</button>
  <button @click='addSex'>添加一个Sex属性</button>
  <button @click='deleteName'>删除一个name属性</button>
</template>
<script>
// 使用 ref 函数,动态修改模板 
//引入 ref 函数 
import {ref, reactive} from 'vue'
export default {
  name: 'App',
  setup() { 
    // 使用 reactive 函数 
    let person = reactive({
      name: 'Yellowsea',
      age: 18,
      type: '前端',
      salary: '30k',
      // 对象中的对象
      a: {
        b: {
          c : 100
        }
      },
      //数据类型 
      arr: ['事件1', '事件2', '事件3'],
    })
    function changeInfo() {
      // 使用 reactive 时, Proxy对象, 修改数据 , 不用像 ref修改对象时需要 xxx.value
      person.type = 'UI工程师',
      person.salary ='14k' 
      person.name = 'Yellowsea',
      person.age = 123,
      person.a.b.c = 200,   // 修改更深层的数据 
      person.arr[0] = '学习'   // 修改数组
    }

    // 验证 Vue3的响应式底层原理 
    function addSex() {
      // 它是直接添加了 sex 这个属性 ，
      // 并没有借助 this.$set  或 Vue.set() 方法 
      person.sex  = '男'
      console.log(person)
    }
    function deleteName() {
      // 删除属性也是一样，没有借助 this.$delete() 或者 Vue.delete() 
      delete person.name
    }
    return {   
      person,
      changeInfo,
      addSex,
      deleteName
    }
    //setup的返回值 
    // 2. 返回一个渲染函数 
    // return () => h('h2', '你好Yellowsea')
  }
} 
</script>