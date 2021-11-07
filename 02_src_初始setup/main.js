// 引入 createApp 
// 引入的不再是Vue构造函数了， 引入的是一个名为 createApp 的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象 ——app  （类似于之前Vue2中的vm， 单app比vm更 轻量）
const app = createApp(App);

// 挂载 #app 
app.mount('#app');