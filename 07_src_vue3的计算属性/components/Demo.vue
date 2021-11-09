<template>
    姓 <input type="text" v-model='person.firstName'>
    <br>
    名 <input type="text" v-model='person.lastName'>
    <br>
    <span>
        <!-- 全名： {{person.fullName}} -->
        全名： <input type="text" v-model='person.fullName'>
    </span>
</template>
<script>
    // Vue3 中使用 计算属性
    // 同样需要引入 computed
    import {reactive,computed} from 'vue'
    export default {
        name: 'Demo',
        setup() {   
            let person = reactive({
                firstName: '张',
                lastName: '三',
                fullName: ''
            })

            // 使用计算属性 , 简写形式（没有考虑 计算属性 被修改的时候 ）
            // person.fullName = computed(() => {
            //     //  跟vue2一样， 具有回调函数 
            //     return person.firstName + '-' + person.lastName
            // })


            // 计算属性， 完整写法 （考虑了计算属性被修改的时候 ） 
            person.fullName = computed({
                get() {
                    return person.firstName + '-' + person.lastName
                },
                set(value) {
                    const nameArr = value.split('-')
                    person.firstName = nameArr[0]
                    person.lastName = nameArr[1]
                },
            })
            return {   
                person,
            }
        }
    } 
</script>