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
    import {reactive, watch,ref,watchEffect} from 'vue'
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

            // watchEffect 函数 
            // watchEffcet 所指定的回调中用到的数据只要发生了变化， 则直接重新执行回调 
            watchEffect(() => {
                const x1 = sum.value   // 值 
                const x2 = person.job.j1.data
                console.log('watchEffect配置的回调执行了', x1, x2 )
            })

            return { 
                sum,
                person
            }
        }
    } 
</script>