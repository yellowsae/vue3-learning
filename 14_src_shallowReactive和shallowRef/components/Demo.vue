<template>
    <h2>person的数据为： {{person}}</h2>
    <h3>name: {{name}}</h3>
    <h3>age: {{age}}</h3>
    <h2> 深层次的数据 ： {{job.j1.data}}</h2>
    <button @click="name += '~'">名字变化</button>
    <button @click="age++">age++</button>
    <button @click="job.j1.data += '!'">添加 ！ </button>
</template>
<script>
    import {reactive,toRef, toRefs, shallowReactive,shallowRef} from 'vue'
    export default {
        name: 'Demo',
        setup() {   

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
            console.log(person)  // 

            // shallowRef ：浅层次的让 ref 定义对象不再使用 reactive， 而是直接变为了对象，并且不具备响应式
            let x = shallowRef({
                Sname : 'Yellowsea',
                Sage : 18
            }) 
            console.log(x.value)  //  Object类型， 而不是 Proxy代理数据类型  {} 



            return { 
                person,
                ...toRefs(person)
            }
        }
    } 
</script>