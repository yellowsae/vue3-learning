## Vue3 新特性









## 创建Vue3.0 工程







### 使用 vue-cli 创建

使用官方文档： https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
// 确保vue 版本在 4.5.0 以上 
vue --version 

// 安装或升级 vue 
npm  install -g @vue/cli

// 创建
vue create vue_test

// 启动 
cd vue_test
npm run serve
```











### 使用 vite 创建 

官方文档 ： https://cn.vitejs.dev/

快速使用 : https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project

优势 

- 开发环境中，无需打包操作， 可以快速冷启动
- 轻量快速的热重载（HMR）
- 真正的按需编译，不再等待整个应用编译完成 



创建

```bash
// 创建工程 
npm init vite-app <project-name>  

//进入工程目录 
cd <project-name>

// 安装依赖 
npm install 

//运行 
npm run dev 
```











## 分析工程文件

基本和Vue2一样 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211105154913.png" alt="image-20211105154648518" style="zoom: 67%;" />

// `main.js`

```js
// 分析入口文件
// 引入 createApp 
// 引入的不再是Vue构造函数了， 引入的是一个名为 createApp 的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象 ——app  （类似于之前Vue2中的vm， 单app比vm更 轻量）
const app = createApp(App);

// 挂载 #app 
app.mount('#app');

//原始的源码 
// createApp(App).mount('#app')
```

//查看app对象

 <img src="https://gitee.com/yunhai0644/imghub/raw/master/20211105154902.png" alt="image-20211105154852994" style="zoom:67%;" />



// `App.vue`   组件 

```vue
<!-- 发生的变化， Vue3中不需要再用 一个 div或其他标签 包裹组件标签了-->
<!-- 发生的变化， 可以不用 根标签 -->
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>
```









## 常用的Composition API

composition API  **组合式API** 







### 拉开序幕的setup





1. 理解 ： Vue3中的一个新配置项，值为一个函数
2. setup 是所有CompositionAPI 组合 的表演舞台 
3. 组件中所用到的 ： 数据， 方法等等， 均需要配置在 setup 中
4. setup函数的两种返回值 ： 
   1. 若返回是一个对象，则对象中的属性、方法、在模板中均可以直接使用 （重点）
   2. 若返回的是一个渲染函数： 则可以自定义渲染内容 
5. 注意点： 
   1. 尽量不要与Vue2配置混用
      1. Vue2配置（data， methos， computeds） 中可以访问到 setup 中的属性，方法 
      2. 但在setup 中不能访问到 Vue2配置的 (data  methods， computeds) 
      3. 如果用重名 ， setup 优先 
   2. setup 不能是一个 async 函数， 因为返回值不再是return的对象，而是 `promise` ， 模板看不到return 对象中的属性 









### ref 函数 



// 前提是需要引入  ref 函数 :  `import {ref} from 'vue'`

// 查看ref函数实例

```js
let name = ref('Yellowsea')
let age  = ref(18)
function changeInfo() {
    // 修改数据 
    // name.value = 'Hide',
    // age.value =  19
    console.log(name,age)  // 查看ref函数封装的值 
}
```

// RefImpl ： ref引入对象 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211107175058.png" alt="image-20211107155730737" style="zoom:67%;" />

当ref函数接收到的数据类型是对象时 

```js
    let obj = ref({
      type: '前端',
      salary: '30k'
    })
    function changeInfo() {
      console.log(obj.value)  // 查看ref函数数据类型为对象时 
      // 修改对象属性 
      obj.value.type = 'UI工程师'
      obj.value.salary = '60k'
    }
```

// 对象显示的是  Proxy 类型

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211107175014.png" alt="image-20211107175003848" style="zoom:67%;" />



**ref函数小结**

1. 作用 ： 定义一个响应式的数据
2. 语法： `const xxx = ref(initValue)` 
   1. 创建一个包含响应式数据对象的 引入对象 （reference 对象，简称 ref对象） 
   2. JS中操作数据 ：  `xxx.value` 
   3. 模板中读取数据： 不需要   `.value` , 直接写模板语法 
3. 备注 ： 
   1. 接收的数据可以是 ： 基本类型、也可以是对象类型
   2. 基本类型数据： 响应式依然是靠`Object.defineProperty()` 的 `get` 与 `set` 完成的 
   3. 对象类型的数据 ： 内部借助了 Vue3 中的一个新的函数  `reactive` 函数







### reactive 函数

将数据变为响应式的数据 

引入 ： `import {ref, reactive} from 'vue'`

//查看 `reactive` 函数返回的数据类型

```js
// 使用 reactive 函数 
let obj = reactive({
    type: '前端',
    salary: '30k'
})
function changeInfo() {
    console.log(obj)
}
```



<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211107210103.png" alt="image-20211107210057619" style="zoom:67%;" />

//使用 `reactive` 函数  Proxy类型修改数据 

```js
// 使用 reactive 函数 
let obj = reactive({
    type: '前端',
    salary: '30k'
})
function changeInfo() {
    // 使用 reactive 时, Proxy对象, 修改数据 , 不用像 ref修改对象时需要 xxx.value
    obj.type = 'UI工程师',
        obj.salary ='14k' 
    // console.log(obj)  // 查看reactive函数的类型
}
```



// `recative` 函数 对不同数据类型的修改 

```js
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
    return {   
      person,
      changeInfo,
    }
```











// `reactive` 函数总结 

1. 作用 ： 定义一个数据类型的响应式数据 （基本类型不要使用 `reactive` , 要用  `ref` 函数 ） 
2. 语法： `const 代理对象  = reactive(元对象) ` 接收一个对象（或数组）， 返回一个**代理对象** （Proxy的实例对象， 简称 Proxy 对象） 
3. `reactive` 定义的响应式数据是深层次的
   1. 内部基于ES6的 Proxy 实现 ，通过代理的对象操作源对象内部数据进行操作











### Vue3的响应式原理



#### **复习Vue2的响应式**

```js
 data () {
    return {
      person: {
        name: 'Yellowsea',
        age : 18,
        hobby: ['学习，吃饭'],
      }
    }
  },
  methods: {
    addSex() {
       // 直接添加是不行的 
      // this.person.sex = '男' 
      // 必须要使用Vue2提供得 this.$set() 
      this.$set(this.person, 'sex', '男')   
      // 或者使用 Vue.set() 方法 
      Vue.set(this.person,'sex','女')
    },

    deleteSex() {
      //直接删除 
      // delete  this.person.sex   // 不能直接删除
      // 使用 this.$delete() 删除  
      this.$delete(this.person, 'sex')
      //使用Vue.delete() 删除  
      Vue.delete(this.person,'sex')
    },
  }
```

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211108110728.png" alt="image-20211108110716226" style="zoom:67%;" />

// vue2实现响应式原理

```js
// 源数据
let person = {
    name: 'yellowsea',
    age: 18,
};
// 模拟vue2 中实现响应式    
let p = {};
Object.defineProperty(p, 'name', {
    get() {
        return person.name
    },
    set(value) {
        console.log('有人修改了name属性 修改的值为 : ' + value)
        person.name = value;
    }
})

Object.defineProperty(p, 'age', {
    get() {
        // 有人读取了 age 属性时调用
        return person.age
    },
    set(value) {
        person.age = value;
    }
})
```





#### Vue3响应式原理

// 数据体现

```js
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
      person.arr[0] = '学习'   // Vue3中借助数组下标修改 数组元素 
    }

    // 验证 Vue3的响应式底层原理 
    function addSex() {
      // 它是直接添加了 sex 这个属性 ，
      // 并没有借助 this.$set  或 Vue.set() 方法 
      person.sex  = '男'   // 添加属性 
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
```

// 查看 person 的实例   `Proxy` **代理对象** 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211108113312.png" alt="image-20211108113307329" style="zoom:67%;" />

> vue2和vue3的响应式原理相比， vue2使用了Object.definePropertry() 的 get/ set 方法监视数据的变化，再进行对数据的操作，而在vue3中使用了 window下的`Proxy` 代理对象对数据进行监视，再对数据进行操作 



// vue3源码实现 

```js
```



  















#### 总结Vue3和vue2响应式原理



**Vue2响应式原理**

- 实现原理 ： 通过 `Object.defineProperty()` 对属性的读取、修改进行操作（数据劫持） 
- 数组类型 ： 通过重写更新数组的一系列方法来实现拦截 （对数组的变更方法进行了包裹`push`等方法）

```js
// Vue响应式原理 
Object.defineProperty(data,'count', {
    get() {}
    set() {}
})
```



- Vue2存在的问题 ： 
  - 新增属性、删除属性、页面不会更新
  - 直接通过下标修改数组， 页面也不会更新 

**Vue3响应式原理**

-  实现原理 
  - 通过`Proxy`(代理) ：  拦截对象中任意属性的变化，包括 ： 属性值的读写，属性的添加， 属性的删除等
  - 通过 `Reflect`(反射) ： 对被代理对象的属性进行操作 
  - MDN文档中对 `Proxy` 和 `Reflect` 的描述 
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
