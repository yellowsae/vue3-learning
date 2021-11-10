<template>
    <h3>sum的值为 ： {{sum}}</h3>
    <button @click='sum++'>sum++</button>
    <br>
    <h2>当前的坐标为： x : {{points.x}}  y为 : {{points.y}}</h2>
</template>
<script>
    import {ref} from 'vue'
    import userPoint from '../hooks/userPoint'   // 是一个函数 
    export default {
        name: 'Demo',
        setup() {   
            let sum = ref(0)

            // 调用引入的函数 
            let points = userPoint()

            // 将获取的坐标写到  hooks 中
            return { 
                sum,
                points
            }
        },
    }
</script>