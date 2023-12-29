import { createApp } from 'vue'
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router/index'
import api from "@/axios/api";
import 'video.js/dist/video-js.css'


const app = createApp(App)

// app.use(router)
app.use(ElementPlus)
app.use(api)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
