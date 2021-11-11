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

   <img src="https://gitee.com/yunhai0644/imghub/raw/master/20211111102907.png" alt="image-20211109154411284" style="zoom:67%;" />

 

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







#### `watchEffect` 函数

- watch的套路是： 既要指明监视的属性，也要指明监视的回调 
- `watchEffect` 的套路是： 不用指明监视那个属性，在`watchEffect` 函数中用到那个属性，就监视那个属性
- `watchEffect` 有点像 `computed` : 
  - 但是 `computed` 注重的计算出来的值 （回调函数的返回值） ， 所以必须要写返回值 
  - 而 `watchEffect` 更注重的是过程（回调函数的函数体）， 所以不用写返回值 

```js
setup() {   
    let sum = ref(0)
    let person = reactive({
        name: "Yellowsea",
        age: 18,
        job: {
            j1: {
                data: 'flag'
            }
        }
    })
    // watchEffect 函数 
    // watchEffcet 所指定的回调中用到的数据只要发生了变化， 则直接重新执行回调 
    watchEffect(() => {
        // 函数内用到那个属性就 监视那个属性 
        const x1 = sum.value   // 值 
        const x2 = person.job.j1.data
        console.log('watchEffect配置的回调执行了', x1, x2 )
    })
}
```

监视结果 ： 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211111103014.png" alt="image-20211109203216335" style="zoom:67%;" />









###  Vue3的生命周期

基本和Vue2的生命周期钩子一样， 

**Vue2的生命周期**



<img src="https://cn.vuejs.org/images/lifecycle.png" alt="vue2" style="zoom: 50%;" />



**Vue3的生命周期**

<img  src="https://v3.cn.vuejs.org/images/lifecycle.svg" alt="vue3" style="zoom:67%;" />

- Vue3 中可以继续使用Vue2中的生命周期钩子， 但有两个被更名 
  - `beforeDestroy` 改名为  `beforeUnmount`  (卸载前)
  - `destroy` 改名为  `unmount`  (卸载)



- Vue3 也提供了  Composition API (组合式API) 形式的生命周期钩子， 和 Vue2中钩子对应关系如下 ： 

下表包含如何在 [setup ()](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 内部调用生命周期钩子：

> | 选项式 API      | Hook inside `setup` |
> | --------------- | ------------------- |
> | `beforeCreate`  |                     |
> | `created`       |                     |
> | `beforeMount`   | `onBeforeMount`     |
> | `mounted`       | `onMounted`         |
> | `beforeUpdate`  | `onBeforeUpdate`    |
> | `updated`       | `onUpdated`         |
> | `beforeUnmount` | `onBeforeUnmount`   |
> | `unmounted`     | `onUnmounted`       |

使用生命周期钩子 组合式 

```js
setup() {   
    let sum = ref(0)
    // 在组合式API setup 中， 使用vue3的生命周期钩子 
    // 直接调用, 都具有 回调函数 
    onBeforeMount(() => {
        console.log('------onBeforeMount-------')
    })
    onMounted (() => {
        console.log('------onMounted-------')
    }) 
    onBeforeUpdate(() => {
        console.log('------onBeforeUpdate-------')
    })
    onUpdated(() => {
        console.log('------onUpdated-------')
    })
    onBeforeUnmount(() => {
        console.log('------onBeforeUnmount-------')
    })
    onUnmounted(() => {
        console.log('------onUnmounted-------')
    })
    return { 
        sum,
    }
},
```



查看输出 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211109213828.png" alt="image-20211109213822596" style="zoom:67%;" />















### 自定义 hook 函数

- 什么是 hook ?  —— 本质是一个函数， 把setup 函数中使用的 Composition API 进行了封装 
- 类似于 Vue2中的 mixin 
- 自定义hook 的优势 ： 复用代码， 让 setup 中的逻辑更清除易懂  



代码实现 ： 

// 在vue3中创建 `src/hooks/userxxx.js` 

```js
// 引入模块 
import { reactive, onMounted, onBeforeUnmount } from 'vue'
export default function() {
    // 是一个函数 
    let points = reactive({
        x: 0,
        y: 0
    })
	// ... 写逻辑部分
    return points
}
```

// 在组件中实现复用 

`Demo.vue`

```js
// 引入复用的函数 
import userPoint from '../hooks/userPoint'   // 是一个函数 
export default {
    name: 'Demo',
    setup() {   
        let sum = ref(0)
        // 使用 调用引入的函数 
        let points = userPoint()
        // 将获取的坐标写到  hooks 中
        return { 
            sum,
            points
        }
    },
}
```

`Test.vue`

```js
import userPoint from '../hooks/userPoint'   // 是一个函数 
export default {
    name: 'Test',
    setup() {
        // 实现组合式API复用 
        // 调用引入的函数 
        let points = userPoint()
        return {
            points
        }
    }
}
```







### toRef



代码实现 

在模板中出现的问题 ： person.name、xxx  模板中的数据长，不美观

```vue
<template>
    <h3>name: {{person.name}}</h3>
    <h3>age: {{person.age}}</h3>
    <h2> 深层次的数据 ： {{person.job.j1.data}}</h2>
    <button @click="person.name += '~'">名字变化</button>
    <button @click="person.age++">age++</button>
    <button @click="person.job.j1.data += '!'">添加 ！ </button>
</template>
```



为什么需要用toRef()

因为需要简写时，如果返回出响应式的数据时， 必须要使用 toRef() 

直接返回简写的 name : 例如 `const name = person.name `// 得到的name是一个字符串，不具有响应式 

而使用了 toRef()后， 例如 `const name = toRef(person, 'name') `// 得到的时 ObjectRefImpl，具有响应式

 









// 解决办法 :  使用 `toRef` 将对象中的数据转为 RefImpl 对象， 可以简写 `person.name` 的写法

​    

```js
// 使用 toRef() 
const name = toRef(person, 'name')  
// toRef() 接收的两个参数，1, 需要简写的对象， 2，需要简写的对象属性 
console.log(name)      // ObjectRefImpl 
console.log(person.name)  // str
```

// 查看`toRef()` 类型，返回的是 `ObjectRefImpl` ，在模板中使用 自动读取 value 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211110142328.png" alt="image-20211110142316740" style="zoom:67%;" />



// `toRefs()` 可以实现 `toRef() `的简写，只有一个传入对象的参数 

```js
const p = toRefs(person)
console.log(p)
```

 <img src="https://gitee.com/yunhai0644/imghub/raw/master/20211110142518.png" alt="image-20211110142507309" style="zoom:67%;" />



 // 在代码中使用 `toRefs()`  和 `toRef()`

```js
// 引入 
import {reactive,toRef,toRefs} from 'vue'
// 使用toRef()实现模板数据简写
        setup() {   
            let person = reactive({
                name: "Yellowsea",
                age: 18,
                job: {
                    j1: {
                        data: 'flag'
                    }
                }
            })
            return { 
                person,
                // 直接写到返回值中
                name: toRef(person, 'name'),
                age: toRef(person, 'age'),
                data: toRef(person.job.j1, 'data')
                
                // 使用 toRefs() 
                ...toRefs(person) 
            }
        }
```



// 最后的结果都是响应式的 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211110142752.png" alt="image-20211110142748093" style="zoom:67%;" />









**//小结** 

- 作用 : 创建一个 ref 对象 ，其value 值指向另一个对象中的某个属性
- 语法： `const name = toRef(person, 'name')  ` 
- 应用 ： 要将响应式对象中的某个属性单独提供给外部使用时 
- 扩展 ： `toRefs` 与 `toRef` 的功能一致，但可以批量创建多个 ref 对象， 语法 ： `toRefs(person)`











## 其他 Composition API  





### shallowReactive	与  shallowRef

- shallowReactive :  只处理对象最外层属性的响应式 （浅层响应式） 
- shallowRef :  只处理基本数据类型的响应式，不进行对象的响应式处理  
- 什么时候使用 ： 
  - 如果有一个对象数据， 结构比较深， 但变化的时 只对外层属性变化 ==>   使用  `shallowReactive` 
  - 如果有一个对象数据 ， 后续功能不会修改该对象中的属性，而是生新对象来替换 ==> `shallowRef` 

```js
            // 使用 shallowReactive /  shallowRef
            // shallowReactive 浅层次的将对象的第一层变为响应式，更深层次的数据不具备响应式
            let person = shallowReactive({  
                name: "Yellowsea",
                age: 18,
                job: {
                    j1: {
                        data: 'flag'
                    }
                }
            })
            console.log(person) 
// shallowRef ：浅层次的让 ref 定义对象不再使用 reactive， 而是直接变为了对象，并且不具备响应式
            let x = shallowRef({
                Sname : 'Yellowsea',
                Sage : 18
            }) 
            console.log(x.value)  //  Object类型， 而不是 Proxy代理数据类型  {} 
```







### readonly 和 shallowReadonly

readonly() 只读   深度 的只读 

shallowReadonly 浅层次的只读

-  readonly()  让一个响应式数据变为只读的  （深度 的只读 ）
- shallowReadonly : 让一个响应式数据变为只读的 （ 浅层次的只读）
- 应用场景 ：不希望数据被修改时 

```js
// 使用 readonly 和 shallowReadonly 
// readonly() 只读 深度的只读 
// shallowReadonly  浅层次的只读 
let sum = readonly(0)  // 使用 readonly 后不能修改 sum 的数据 
let person = reactive({   
    name: "Yellowsea",
    age: 18,
    job: {
        j1: {
            data: 'flag'
        }
    }
})
// 使用shallowReadonly 后不能该对象的第一层数据，深层的数据可以修改 
person = shallowReadonly(person)
```



### toRaw 和 markRaw

- toRaw : 
  - 作用 ： 将一个由 `reactive` 生成的响应式对象 转为 普通对象 
  - 使用场景 ： 用于读取响应式对象对应的普通对象，对这个普通对象的所有操作， 不会引起页面更新
- markRaw :
  - 作用 ： 标记一个对象， 使其永远不会变为响应式对象 
  - 使用场景 ： 
    1. 有些值不应该被设为响应式， 例如 复杂的第三方库等
    2. 当渲染具有不可变数据源的大列表时， 跳过响应式转换可以提高性能 

```js
setup() {   
    let sum = ref(0)  
    let person = reactive({   
        name: "Yellowsea",
        age: 18,
        job: {
            j1: {
                data: 'flag'
            }
        },
    })
    // toRaw() 只能处理 reactive 处理的响应式 
    function showRawPerson() {
        // console.log(person)  // proxy 
        const p = toRaw(person)  // 使用 toRow() 将响应式对象变为原始的 OBJ对象 
        // 如果处理的是ref 定义的数据 ,不会对 ref 定义的数据类型修改
        const x = toRaw(sum)  // RefImpl  
        }
    function addCar () {
        let car = {name: '奔驰', price: 40}  
        person.car = car  // 添加的车的信息数据是响应式的 
        // 使用 markRaw()， 让响应式的对象变为 普通的对象 
        person.car  = markRaw(car)
    }
    return { 
        sum,
        addCar,
        person,
        showRawPerson,
        ...toRefs(person)
    }
}
```







### customRef 

自定义ref  ，具有相当大的操作数据的空间 

```js
    setup() {
      //  使用官方的 ref ，直接实现数据修改 
      // let keyword = ref('hello')

      function myRef(value, delay) {
        // 使用自定义 ref  对数据进行操作 
        //使用 customRef()  自定义ref 

         // myRef 的返回值
        return customRef((track, trigger) => {  
          let timer 
          // customRef() 收到连个参数  track, trigger
          // track, : 通知Vue追踪return 返回值value的变化 （提前跟get商量以下，让他认为这个value是有用的）
          //  trigger : 通知 Vue 去重新解析模板

          // customRef()的返回值，具有两个函数 getter 和 setter 
          return {
            get() {
              console.log(`有人读取了  myRef中的数据 ，我要把  ${value} 给他了`)
              // get的返回值, 就是出现到模板中的数据  
              track()  // 通知Vue追踪return 返回值value的变化 （提前跟get商量以下，让他认为这个value是有用的）
              return value
            },
            set(newVal) {  // newVal 是修改后的参数 
              console.log(`有人修改了myRef中的数据 为： ${newVal}`)
              // 实现延迟响应数据变化 
              // 开启防抖 
              clearTimeout(timer)
              timer = setTimeout(() => {
                value = newVal // 修改数据 
                trigger()  //  通知 Vue 去重新解析模板
              }, delay)  // 定时 
            }
          }
        })
      }
      // 定义一个函数  myRef 自定义ref 
      let keyword = myRef('hello', 500)
      return {
        keyword      
      }
    }
```

// 实现功能  ， 等几秒再修改数据 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211111134519.png" alt="image-20211111134513638" style="zoom:67%;" />











###  provide 和 inject

`provide` 和 `inject `能够实现组代组件 和 **它的后代组件** (所有后代) 传输数据  ， 一般用于祖孙之间， 父子之间的传递数据方法还是使用 `props` 方法比较合理 



接收到的数据也是 `Proxy` 代理对象类型的 

<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211111162625.png" alt="image-20211111162616164" style="zoom: 67%;" />



- 作用 ： 实现 <strong style="color: orange; font-size: 20px ">祖孙组件间的通信</strong>  

- 实现原理 ： 父组件中有一个 `provide` 选项来提供数据 ，子组件中有一个 `inject` 选项来接收数据 

- 具体写法 ：

  1. 祖组件中 

     ```js
     import {toRefs, reactive, provide} from 'vue'
     setup() {
         let cat = reactive({name : '奔驰',price: '40W'})
         // provide 的使用方法
         provide('cat', cat)  // 接收连个参数， 一个是定义的名字，和需要传递的参数 
         return {
             ...toRefs(cat)
         }
     }
     ```

  2. 后代组件中

     ```js
     // inject 使用 inject 接收祖代传递的数据 
     import {inject,toRefs} from 'vue'
     setup() {
         // 使用方法 inject('cat') ，接收组代 provide() 定义的数据 
         let cat = inject('cat') 
         return {...toRefs(cat)}
     }
     ```



### 对响应式数据进行判断 

- isRef : 检查一个值是否为一个 ref 对象 
- isReactive :  检查一个值是否由 `reactive` 创建的响应式对象
- isReadonly : 检查一个对象是否由 `readonly` 创建的只读代理 
- isProxy : 检查一个对象是否由 `reactive` 或者 `readonly` 方法创建的代理 



// 需要使用时， 都要进行引入 

```js
let cat = reactive({name : '奔驰',price: '40W'})
let sum = ref(0)
let cat2 = ref({name : '奔驰',price: '40W'})
let test = readonly(cat)

console.log(isRef(sum))  //true 
console.log(isReactive(cat))  // true
console.log(isReadonly(test)) // true
console.log(isProxy(cat2))  // false 
console.log(isProxy(cat)) // true
```





## 组合式API 的优势



Composition API  和 Opt







## 新增的组件



### Fragment 

- 在 Vue2中 ： 组件必须要有一个根标签 
- 在Vue3中 ： 组件可以没有根标签， 内部会将多个标签包含在一个`Fragment` 虚拟元素中 
- 好处 ： 减少标签层级，减少内存占用 



<img src="https://gitee.com/yunhai0644/imghub/raw/master/20211111204132.png" alt="image-20211111204123497" style="zoom: 50%;" />







### Teleport



- 什么是 `Teleport`  —— 是一种能够将我们的组件 HTML 结构移动到指定的位置 

  // 使用`teleport`
  
  ```vue
  <teleport to='body'>  
      <!--  to='body' : 需要移动到的位置-->
  	<div v-if='isShow' class='mask'>
          <div class='dialog'>
              <h3>我是一个弹窗</h3>
              <button @click='isShow = false'>关闭弹窗</button>
          </div>
      </div>
  </teleport>
  ```







### Suspense

为什么需要异步引入组件 :  因为开发过程中如果 App 使用了静态引入组件， 而组件实现的内容过于庞大，导致页面渲染很慢， 所以使用了 异步引入组件， （那个组件加载好了，就在页面中展示 ） ，所以在开发中都会使用异步引入组件 



// 使用vue内置的 `defineAsyncComponent` Api    

```js
// import Chlid from './components/Chlid.vue'  // 静态引入组件 
import {defineAsyncComponent} from 'vue'   // defineAsyncComponent 引入动态组件API 
const Chlid = defineAsyncComponent(() => import('./components/Chlid'))   // 动态引入组件 
// 出现的情况 ： 当网速慢时候，先出现 APP组件，然后再出现 Chlid
```



为什么使用 Suspense   :  当开发过程时， 浏览网页，网速过慢时， 为了让用户更好的体验，可以展示提示的内容 

// 使用 `Suspense`  标签

需要注意 ：内置的两个插槽 `default`  `fallbakc`

```vue
    <Suspense>
      <!--  内置了两个插槽  --> 
      <!-- 1. 是 define 的， 默认的 ， 展示你要展示的内容 
          2. 是当组件在 加载时候， 要展示的提示内容  -->
          <!-- 需要使用v-slot 指明放入那个插槽中 default 默认展示的   fallback 正在加载的 
              default 和 fallback 不允许修改 ，官方定义的-->
          <template v-slot:default>  
            <Chlid />
          </template>
          <template v-slot:fallback>
            <h2>正在加载中 ..........</h2>
          </template>
    </Suspense>
```



- 等待异步组件时渲染一些额外内容， 让应用有更好的用户的体验

- 使用步骤 ：

  1. 引入： 

     ```js
     import {defineAsyncComponent} from 'vue'    
     const Chlid = defineAsyncComponent(() => import('./components/Chlid')) 
     ```

  2. 使用 `Suspense` 包裹组件，并配置好 `default` 和 `fallback`

     ```vue
     <template>
       <div class="app">
         <h2>我是App 组件</h2>
         <Suspense>
           <!--  内置了两个插槽  --> 
           <!-- 1. 是 define 的， 默认的 ， 展示你要展示的内容 
               2. 是当组件在 加载时候， 要展示的提示内容  -->
     
               <!-- 需要使用v-slot 指明放入那个插槽中 default 默认展示的   fallback 正在加载的 
                   default 和 fallback 不允许修改 ，官方定义的-->
               <template v-slot:default>  
                 <Chlid />
               </template>
               <template v-slot:fallback>
                 <h2>正在加载中 ..........</h2>
               </template>
         </Suspense>
       </div>
     </template>
     ```

     

  



