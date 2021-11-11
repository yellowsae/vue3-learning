<template>
  <input type="text" v-model='keyword'>
  <h2>{{keyword}}</h2>
</template>
<script>
  import {ref,customRef} from 'vue'
  export default {
    name: 'App',
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
  } 
</script>