// 引入模块 
import { reactive, onMounted, onBeforeUnmount } from 'vue'

export default function() {
    // 是一个函数 
    let points = reactive({
        x: 0,
        y: 0
    })

    // 写函数逻辑 

    function savePoints(event) {
        points.x = event.pageX
        points.y = event.pageY
        console.log(event.pageX, event.pageY)
    }

    //挂载时 
    onMounted(() => {
        window.addEventListener('click', savePoints)
            // window.addEventListener('click',(event) => {
            //     points.x = event.pageX
            //     points.y = event.pageY
            //     console.log(event.pageX,event.pageY)  // 当Deom组件被卸载后 依然能够输出坐标
            // })
    })

    // 在卸载前 
    onBeforeUnmount(() => {
        // 取消点击函数 
        window.removeEventListener('click', savePoints)
    })

    return points
}

// // 暴露出去  
// export default savePoints