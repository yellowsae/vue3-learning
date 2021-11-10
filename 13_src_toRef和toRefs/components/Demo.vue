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
    import {reactive,toRef, toRefs} from 'vue'
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
            /**
             * 为什么需要用toRef()
             * 因为需要简写时，如果返回出响应式的数据时， 必须要使用 toRef() 
             * 直接返回简写的 name : 例如  const name = person.name // 得到的name是一个字符串，不具有响应式 
             * 而使用了 toRef()后，  例如 const name = toRef(person, 'name')  // 得到的时 ObjectRefImpl，具有响应式
             * */ 
            

            // 使用 toRef() 
            // const name = toRef(person, 'name')  
            // // toRef() 接收的两个参数，1, 需要简写的对象， 2，需要简写的对象属性 
            // console.log(name)      // ObjectRefImpl 
            // console.log(person.name)  // str


            // 使用 toRefs()  参数是一个对象  
            // const p = toRefs(person)
            // console.log(p)
            return { 
                person,
                // 直接写到返回值中
                // name: toRef(person, 'name'),
                // age: toRef(person, 'age'),
                // data: toRef(person.job.j1, 'data')

                // 使用 toRefs()，引入toRefs() 返回的是一个对象，  
                ...toRefs(person)
            }
        }
    } 
</script>