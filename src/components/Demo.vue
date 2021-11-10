<template>
    <h3>name: {{person.name}}</h3>
    <h3>age: {{person.age}}</h3>
    <h2> 深层次的数据 ： {{person.job.j1.data}}</h2>
    <button @click="person.name += '~'">名字变化</button>
    <button @click="person.age++">age++</button>
    <button @click="person.job.j1.data += '!'">添加 ！ </button>
</template>
<script>
    import {reactive} from 'vue'
    export default {
        name: 'Demo',
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
                person
            }
        }
    } 
</script>