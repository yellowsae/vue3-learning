<template>
    <h2>我是Test组件</h2>
    <!-- 复用 poins  -->
    <h2>当前的坐标为： x : {{points.x}}  y为 : {{points.y}}</h2>

</template>
<script>
    import userPoint from '../hooks/userPoint'   // 是一个函数 
    export default {
        name: 'Test',
        setup() {
            // 实现组合式API复用 
            // 调用引入的函数 
            let points = userPoint()
            return {
                points
            }
        }
    }
</script>

<style>

</style>