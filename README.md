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
// 源数据
let person = {
    name: 'yellowsea',
    age: 18,
};

// 模拟vue3 中的响应式
// window.Proxy 借助window下的数据代理

const p = new Proxy(person, {
    // 定义 Proxy对象，传入两个参数，一个是原对象，一个操作数据的对象
})
```

**p和 person的数据类型**   

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211108160321.png" alt="image-20211108160316346" style="zoom:70%;" />

  // 在 `Proxy` **代理对象**中操作数据 

```js
const p = new Proxy(person, { 
    // 定义 Proxy对象，传入两个参数，一个是原对象，一个操作数据的对象

    // 读取对象的方法 
    get(target, propName) {
        // 接收到两个参数 ： 
        // target 原对象 person ， propName: 修改的属性值，
        console.log(`有人读取了p身上的 ${propName} 属性`)
        return target[propName] // 返回读取的属性
    },
    // set() 修改对象中的属性
    set(target, propName, value) {
        // 接收到三个参数 ： 
        // target 原对象 ， propName: 修改的属性值， value ： 修改后的值 
        console.log(`有人修改了p身上的 ${propName}属性 值为 ： ${value} `)
        return target[propName] = value // 修改数据 
    }
})
```

// get() 和 set()  只是在`Proxy`中的读取和修改数据操作， 进行响应式 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211108160849.png" alt="image-20211108160842380" style="zoom:67%;" />



//  

```js
const p = new Proxy(person, { // 定义 Proxy对象，传入两个参数，一个是原对象，一个操作数据的对象

    // 读取对象的方法 
    get(target, propName) {
        // 接收到两个参数 ： 
        // target 原对象 person ， propName: 修改的属性值，
        console.log(`有人读取了p身上的 ${propName} 属性`)
        return target[propName] // 返回读取的属性
    },

    // set() 修改对象中的属性
    // set() 也能添加属性 
    set(target, propName, value) {
        // 接收到三个参数 ： 
        // target 原对象 ， propName: 修改的属性值， value ： 修改后的值 
        console.log(`有人修改了p身上的 ${propName}属性 值为 ： ${value} `)
        return target[propName] = value // 修改数据 
    },

    // delete  删除数据时候调用
    deleteProperty(target, propName) {
        // 接收到的参数和上边方法一样
        console.log(`有人删除了 p身上的 ${propName} 属性, 我要去修改页面了 `)
        return delete target[propName]
        // deleteProperty 布尔值， 直接把删除后的返回值 返回就行
    }
})
```

// 删除和添加熟悉操作 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211108161917.png" alt="image-20211108161841954" style="zoom:67%;" />



**认识Reflect**

Reflect是 **反射对象**

在Vue3响应式原理中 `Proxy` 使用到了 `Reflect` 方法 

```js
            // 读取对象的方法 
            get(target, propName) {
                // 接收到两个参数 ： 
                // target 原对象 person ， propName: 修改的属性值，
                console.log(`有人读取了p身上的 ${propName} 属性`);
                // return target[propName] // 返回读取的属性
                // 使用 Reflect 对象属性操作 
                return Reflect.get(target, propName)
            },

            // set() 修改对象中的属性
            // set() 也能添加属性 
            set(target, propName, value) {
                // 接收到三个参数 ： 
                // target 原对象 ， propName: 修改的属性值， value ： 修改后的值 
                console.log(`有人修改了p身上的 ${propName}属性 值为 ： ${value} `);
                // return target[propName] = value // 修改数据 
                return Reflect.set(target, propName, value)
            },

            // delete  删除数据时候调用
            deleteProperty(target, propName) {
                // 接收到的参数和上边方法一样
                console.log(`有人删除了 p身上的 ${propName} 属性, 我要去修改页面了 `);
                // return delete target[propName]
                // deleteProperty 布尔值， 直接把删除后的返回值 返回就行
                return Reflect.deleteProperty(target, propName)
            }
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
    
    ```js
    const p = new Proxy(person, { 
        // 拦截读取对象的值 
        get(target, propName) {
            return Reflect.get(target, propName)
        },
        // 拦截设置属性值，或添加属性值 
        set(target, propName, value) {
            return Reflect.set(target, propName, value)
        },
        // 拦截删除属性
        deleteProperty(target, propName) {
            return Reflect.deleteProperty(target, propName)
        }
    })
    ```
    
    

###  `reactive `对比 `ref`



- 从定义数据角度对比： 
  - `ref`用来定义： **基本类型数据**
  - `reactive` 用来定义 ： 对象（或数组） 类型数据 
  - 备注 ：` ref` 也可以用来定义 对象（或数组） 类型数据 ， 它内部会通过 `reactive` 转为代理对象 
- 从原理角度对比 
  - `ref` 通过 `Object.defineProperty()` 的 `get` 与 `set` 来实现响应式 （数据劫持 ）（和vue2一样）
  - `reactive` 通过使用 `Proxy` 来实现响应式（数据劫持），并通过 `Reflect` 操作 源对象 内部的数据 
- 从使用角度相比
  - `ref` 定义的数据： 操作数据需要 `.value` ， 读取数据时模板中直接读取不需要`.value` 
  - `reactive` 定义的数据： 操作数据与读取数据 ： 均不需要 `.value`







### `setup` 的两个注意点





**Vue2知识复习**

> 在vue2时候，使用 在组件传递参数 ，在子组件中使用 `props` 接收，可以通过 `this.xxx` 接收到父给子传递的数据 。 但是如果 子组件 不接收 父组件传过来的数据  ， 则数据不会出现在子组件的 `this` 身上， 而是存在了 vc身上的 `$attrs`  中 

> 同样的情况，在vue2中使用插槽时，  子组件没有定义插槽， 而父组件给子组件传递了`<html>`数据 ，则数据不会出现页面上，而是存在了  vc 的`  $slots`  中 

 

***`setup` 的执行时机 ：*  比 `beforeCreate()` 钩子还早** 

```js
        beforeCreate() {
            console.log('---------------beforeCreate-----------------')
        },
        setup() { 
            console.log('--------setup--------' + '此时的this是' + this)
        }
```

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211109153134.png" alt="image-20211109153117511" style="zoom:67%;" />





**`setup` 接收到的两个参数**    :   `setup(props, context)`  

- `props` :   

  ```js
  // 父组件给子组件传递的参数同样使用 props 接收 
  props: ['msg','hello'],
  
      setup(props) {   
      // setup 接收到的两个参数  props  context 
      // props : 定义接收数据时使用到的 
      // context : 
      console.log(props) 
  }
  ```

  <img src="https://gitee.com/yunhai0644/imghub/raw/master/20211109153741.png" alt="image-20211109153738482" style="zoom:50%;" />

> `props` 用于接收上层组件的数据，并且传输的数据也是和vue2一样， 都先使用 `props: []` 接收 ，再传给  `setup` ,   参数得到得是一个`Proxy` **代理数据对象**  





- `context` ：  上下文， 本质是一个对象, 普通的Object对象 , 里面有着和vue2中一些方法 

  ```js
  setup(props,context) {   
      console.log(context) 
  }
  ```

   <img src="../../AppData/Roaming/Typora/typora-user-images/image-20211109154411284.png" alt="image-20211109154411284" style="zoom:67%;" />

 

> context : 上下文的意思，本质是一个对象 ， 身上有着和vue2相同的一些方法，
>
>   `attrs()` 用于接收没有定义的 `props` 参数，  
>
> `emit()` 用于定义自定义触发事件 
>
> `slots()` ： 接收插槽未定义的标签数据 



**setup两个注意点**



- `setup` 的执行时机 ：
  - 在 `beforeCreate` 之前执行一次 ， this是 undefined 
- `setup` 的参数 
  - `props` :  值为对象， 包含 ： 组件外部传递过来， 且组件内部生命接收了属性 
  - `context` :  上下文对象
    - `attrs ` ： 值为对象， 包含 ： 组件外部传过来， 但没有在 `props` 配置中声明接收的属性， 相当于`this.$attrs` 
    - `slots` :  收到的插槽内容，相当于 `this.$slots` 
    - `emit` ： 分发自定义事件的函数， 相当于 `this.$emit`







### Vue3中的计算属性 

与 vue2 的 computed 配置功能基本一致 

写法： 

```js
// 需要引入 computed 
    import {reactive,computed} from 'vue'

	setup() {   
            let person = reactive({
                firstName: '张',
                lastName: '三',
                fullName: ''
            })

            // 使用计算属性 , 简写形式（没有考虑 计算属性 被修改的时候 ）
            // person.fullName = computed(() => {
            //     //  跟vue2一样， 具有回调函数 
            //     return person.firstName + '-' + person.lastName
            // })


            // 计算属性， 完整写法 （考虑了计算属性被修改的时候 ） 
            person.fullName = computed({
                get() {
                    return person.firstName + '-' + person.lastName
                },
                set(value) {
                    const nameArr = value.split('-')
                    person.firstName = nameArr[0]
                    person.lastName = nameArr[1]
                },
            })
            return {   
                person,
            }
        }
```







### Vue3中的watch 监视属性

监视属性与 vue2 中 watch 配置功能一致 

两个小坑： 

- 监视 reactive 定义的响应式数据时， oldval 无法正确获取、并且强制开启了深度监视 （deep配置无效） 
- 监视 reactive  定义的响应式数据中的某个数据时 ：  `deep` 配置有效 



watch 是一个函数，直接调用， 

能有接收三个参数： 1, 需要监视的值， 2,回调函数 3, 监视的配置项 



**情况一**

```js
//第一种情况， 监视 ref 定义的单个属性  
watch(sum, (newVal, oldVal) => {
    console.log('sum的值变化了', newVal, oldVal)
})
```



**情况二**

```js
// 第二种情况 监视 多个 ref定义的单个属性 
watch([sum, age] , (newVal, oldVal) => {
    console.log('sum, age 都被修改了',newVal, oldVal )
}, {immediate: true})   // 给watch 添加配置项 immediate 初始时 执行一次配置 

```



**情况三** ： 不能够监视到reactive定义的响应式数据的变化 

```js
let person = reactive({
    name: "Yellowsea",
    age: 18
})
/**
             * 情况三 ：监视reactive 所定义的一个响应式数据的全部属性 
             *  1. 注意： 此处无法开启正确的获取 oldValue 
             *  2. 注意： 强制开启了深度监视 （使用 deep 配置无效）
             *  */  

watch(person,(newVal, oldVal) => {
    console.log("person 的值变化了")
    console.log("newVal为 ", newVal)
    console.log("oldVal为" , oldVal)
})
```

区分不了 `newVal` 和 `oldVal`

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211109170351.png" alt="image-20211109170345538" style="zoom:67%;" />



**情况四**  ： 能够监视得到单个数据的变化 

```js
// 情况四： 监视reactive 所定义的一个响应式数据中的某一个数据 
watch(() => person.name, (newVal, oldVal)=> {
    console.log('person中的name 属性的值变化了' , newVal , oldVal)
})
```

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211109170816.png" alt="image-20211109170811541" style="zoom:67%;" />



**情况五**  : 能够监视得到多个数据的变化 

```js
// 情况五，监视reactive 所定义的一个响应式数据中的 多个 数据
watch([() => person.name, ()=> person.age], (newVal, oldVal) => {
    console.log('person中的name和age 发生了变化 ', newVal, oldVal)
})
```

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211109171329.png" alt="image-20211109171044034" style="zoom: 50%;" />



**特殊情况** :  不能有监视到  `newVal` 和 `oldVal` 的变化 

```js
let person = reactive({
    name: "Yellowsea",
    age: 18,
    job: {
        j1: {
            data: 'flag'
        }
    }
})
// 特殊情况 
// // 这里的 deep:true 是有效的 
watch(()=> person.job, (newVal, oldVal)=> {
    console.log('job下的data数据被修改了', newVal, oldVal)
}, {deep: true})   // 这里的 deep:true 是有效的 
```

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211109172139.png" alt="image-20211109172128241" style="zoom:57%;" />







#### watch 监视属性中 value 问题

```js
 setup() {   
            let sum = ref(0)
            let person = ref({
                name: "Yellowsea",
                age: 18,
                job: {
                    j1: {
                        data: 'flag'
                    }
                }
            })
            
            // 在监视属性中遇到的 value 问题 
            /**  出现原因 ： 因为在模板中出现的sum的值0 , 使用的ref()函数定义的。
             *   在setup中使用的 sum 应该是 sum.value 才能获取到 sum 的值 ，在监视属性中直接用 sum 而不是用 sum.value 
             * 
             * 原因 ：监视 sum ，sum在这里是 RefImpl，wacht() 默认是开启 deep:true 的，
             *       所以直接监视sum，就能够监视到sum的属性了，不需要 sum.value ，
             *   // sum.value === 0 ， warch(0, ()=> ) ???
             * */
            watch(sum, (newVal, oldVal) => {
                console.log('sum的值变化了', newVal, oldVal)
            })

            // 另一种遇到 value的问题 , 假设 person 是由 ref 定义的 
            /**
             * 因为: ref定义的person实质是 RefImpl , 
             * person.value 转为了 reactive 
             */
            // watch(person,(newVal, oldVal) => {  // person  : RefImpl 
            //     console.log('person发生了变化', newVal, oldVal)  // 执行不了  
            // })

            // 执行不了， 解决办法 1   给 person 加上 .value ，让watch监视的 Proxy 
            // watch(person.value,(newVal, oldVal) => {  // person  : Proxy 
            //     console.log('person发生了变化', newVal, oldVal)  // 执行不了  
            // })

            // 解决办法二 : 开启深度监视  deep:true ， 开启后 RefImpl就能都监视到更深层次的 属性变化， 也包括 Proxy
            watch(person,(newVal, oldVal) => {  // person  : Proxy 
                console.log('person发生了变化',     newVal, oldVal)  // 执行不了  
            }, {deep:true})
            return { 
                sum,
                person
            }
        }
```





