<template>
    <h3>sum的值为 ： {{sum}}</h3>
    <button @click='sum++'>sum++</button>
    <br>
    <h3>name: {{person.name}}</h3>
    <h3>age: {{person.age}}</h3>
    <button @click="person.name += '~'">名字变化</button>
    <button @click="person.age++">age++</button>

    <h2> 深层次的数据 ： {{person.job.j1.data}}</h2>
    <button @click="person.job.j1.data += '!'">添加 ！ </button>
</template>
<script>
    //  Vue3 中的监视属性 
    import {reactive, watch,ref} from 'vue'
    export default {
        name: 'Demo',
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
            // 使用计算属性 
            //  watch 是一个函数，直接调用， 能有接收三个参数： 1, 需要监视的值， 2,回调函数 3, 监视的配置项 
            
            //第一种情况， 监视 ref 定义的单个属性  
            // watch(sum, (newVal, oldVal) => {
            //     console.log('sum的值变化了', newVal, oldVal)
            // })

            // 第二种情况 监视 多个 ref定义的单个属性 
            // watch([sum, age] , (newVal, oldVal) => {
            //     console.log('sum, age 都被修改了',newVal, oldVal )
            // }, {immediate: true})   // 给watch 添加配置项 immediate 初始时 执行一次配置 

            /**
             * 情况三 ：监视reactive 所定义的一个响应式数据的全部属性  person 
             *  1. 注意： 此处无法开启正确的获取 oldValue 
             *  2. 注意： 强制开启了深度监视 （使用 deep 配置无效）
             *  */  
            // watch(person,(newVal, oldVal) => {
            //     console.log("person 的值变化了")
            //     console.log("newVal为 ", newVal)
            //     console.log("oldVal为" , oldVal)
            // })

            // 情况四： 监视reactive 所定义的一个响应式数据中的某一个数据 
            // watch(() => person.name, (newVal, oldVal)=> {
            //     console.log('person中的name 属性的值变化了' , newVal , oldVal)
            // })

            // 情况五，监视reactive 所定义的一个响应式数据中的 多个 数据
            // watch([() => person.name, ()=> person.age], (newVal, oldVal) => {
            //     console.log('person中的name和age 发生了变化 ', newVal, oldVal)
            // })

            // 特殊情况
            watch(()=> person.job, (newVal, oldVal)=> {
                console.log('job下的data数据被修改了', newVal, oldVal)
            }, {deep: false})
            return { 
                sum,
                person
            }
        }
    } 
</script>