// import $cookie from "vue-cookie";
import axios from 'axios'


const API = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 300000
})//接口地址和延迟访问

    /*登录注册拦截*/
// API.interceptors.request.use(config => {
//     if (config.url !== '/userApi/login' && config.url !== '/userApi/register')
//         config.headers['token'] = $cookie.get("token");
//     return config
// },error=>{
//     return Promise.reject(error)
// })
export default API
