<template>
    <h2>sum: {{sum}}</h2>
    <button @click='sum++'>sum++</button>
    <h3>name: {{name}}</h3>
    <h3>age: {{age}}</h3>
    <h2> 深层次的数据 ： {{job.j1.data}}</h2>
    <h3 v-show="person.car">{{person.car}}</h3>
    <button @click="name += '~'">名字变化</button>
    <button @click="age++">age++</button>
    <button @click="job.j1.data += '!'">添加 ！ </button>
    <button @click='showRawPerson'>输出最原始的person</button>
    <button @click='addCar'>添加一个汽车对象</button>
    <button v-show="person.car" @click="person.car.name += '!' ">修改车的数据</button>
    <button v-show="person.car"  @click="person.car.price++" >修改车的价格</button>
    
</template>
<script>
    import {reactive,ref,toRefs, toRaw, markRaw} from 'vue'
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
    } 
</script>