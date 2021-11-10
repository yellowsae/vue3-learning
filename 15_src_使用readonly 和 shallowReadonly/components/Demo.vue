<template>
    <h2>sum: {{sum}}</h2>
    <button @click='sum++'>sum++</button>
    <h3>name: {{name}}</h3>
    <h3>age: {{age}}</h3>
    <h2> 深层次的数据 ： {{job.j1.data}}</h2>
    <button @click="name += '~'">名字变化</button>
    <button @click="age++">age++</button>
    <button @click="job.j1.data += '!'">添加 ！ </button>
</template>
<script>
    import {reactive,onMounted,toRefs, readonly,shallowReadonly} from 'vue'
    export default {
        name: 'Demo',
        setup() {   
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
            onMounted(() => {
                console.log(person)
            })
            return { 
                sum,
                ...toRefs(person)
            }
        }
    } 
</script>