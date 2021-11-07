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







// `reactive` 函数总结 

1. 作用 ： 定义一个数据类型的响应式数据 （基本类型不要使用 `reactive` , 要用  `ref` 函数 ） 
2. 语法： `const 代理对象  = reactive(元对象) ` 接收一个对象（或数组）， 返回一个**代理对象** （Proxy的实例对象， 简称 Proxy 对象） 
3. `reactive` 定义的响应式数据是深层次的
   1. 内部基于ES6的 Proxy 实现 ，通过代理的对象操作源对象内部数据进行操作











### Vue3的响应式原理









