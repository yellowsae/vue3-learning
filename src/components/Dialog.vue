<template>
    <button @click='isShow = true'>点击弹窗</button>
    <!-- 使用 teleport 传送标签 -->
    <teleport to='body' >
        <div  v-if='isShow' class='mark'>
            <div  class='dialog'>
                <h3>我是一个弹窗</h3>
                <h4>弹窗</h4>
                <h4>弹窗</h4>
                <h4>弹窗</h4>
                <h4>弹窗</h4>
                <button @click='isShow = false'>关闭弹窗</button>
            </div>
        </div>
    </teleport>
</template>

<script>
    import {ref} from 'vue'
    export default {
        name: 'Dialong',
        setup() {
            let isShow = ref(true)
            return {isShow}
        }
    }
</script>
<style>
    .mark {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .dialog {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        background-color: green;
    }
</style>