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
    } 
</script>