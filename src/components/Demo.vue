<template>
    <h2 v-show='person.name'>一个人的信息： {{person.name}}</h2>
    <h2>一个人的年龄 ： {{person.age}}</h2>
    <button @click='test'>触发一个自定义事件hello</button>
</template>
<script>
    import {reactive} from 'vue'
    export default {
        name: 'Demo',
        beforeCreate() {
        },
        // 接收自定义事件，使用 emits: ['']  在 vue2不用声明接收自定义事件 
        // emits: ['hello'],
        // 父组件给子组件传递的参数同样使用 props 接收 
        props: ['msg','hello'],

        setup(props,context) {   
            // setup 接收到的两个参数  props  context 
            // props : 定义接收数据时使用到的 
            // context : 上下文的意思，本质是一个对象 
            // console.log(props) 
            console.log(context.emit)
            console.log(context.slots)
            let person = reactive({
                name: 'Yellowsea',
                age: 18,
            })

            function test() {
                // 使用 context中的 emit 触发自定义事件 
                context.emit('hello', 'testaaaaaaaaa')
            }
            return {   
                person,
                test
            }
        }
    } 
</script>