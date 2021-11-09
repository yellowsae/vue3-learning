<template>
    <h3>sum的值为 ： {{sum}}</h3>
    <button @click='sum++'>sum++</button>
</template>
<script>
    // 在组合式API中，使用的生命周期钩子都需要引入
    import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue'
    export default {
        name: 'Demo',
        setup() {   
            let sum = ref(0)
            // 在组合式API setup 中， 使用vue3的生命周期钩子 
            // 直接调用, 都具有 回调函数 
            onBeforeMount(() => {
                console.log('------onBeforeMount-------')
            })
            onMounted (() => {
                console.log('------onMounted-------')
            }) 

            onBeforeUpdate(() => {
                console.log('------onBeforeUpdate-------')
            })

            onUpdated(() => {
                console.log('------onUpdated-------')
            })

            onBeforeUnmount(() => {
                console.log('------onBeforeUnmount-------')
            })

            onUnmounted(() => {
                console.log('------onUnmounted-------')
            })
            return { 
                sum,
            }
        },
        // 在vue3 中依然可以用vue2 中的生命周期钩子 
        // 写在配置项中 

        //#region 
        // beforeCreate() {
        //     console.log('---------beforeCreate-----------')
        // },
        // created() {
        //     console.log('---------created-----------')
        // },
        // beforeMount() {
        //     console.log('---------beforeMount-----------')
        // },
        // mounted() {
        //     console.log('---------mounted-----------')
        // },
        // beforeUpdate() {           
        //     console.log('---------beforeUpdate-----------')
        // },
        // updated() {            
        //     console.log('---------updated-----------')
        // },
        // beforeUnmount() { 
        //     console.log('---------beforeUnmount-----------')
        // } ,
        // unmounted() {
        //     console.log('---------unmounted-----------')
        // } ,

        //#endregion
    } 
</script>