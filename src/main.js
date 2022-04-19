import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import { errorHandler } from '@/utils/common'
// 导入路由
import router from './router'
// 导入vuex
import store from './store'
const app = createApp(App)
app.use(router)
app.use(ElementPlus, { locale: zhCn, })
app.use(store)

// 全局异常配置
app.config.errorHandler = errorHandler

app.mount('#app')

