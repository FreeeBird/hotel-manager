import axios from 'axios'
import Cookie from 'js-cookie'
import router from '../router/router'
import Qs from 'qs'
import { Message } from 'element-ui';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  transformRequest: [function(data) {
    data = Qs.stringify(data)
    return data
  }],
  timeout: 5000 // 请求超时时间
})
service.defaults.withCredentials = true;

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code!==1000){
      Message({
        message: res.message,
        type: 'error',
        duration: 2 * 1000
      })
    }
    if(res.code===1100){
      Cookie.remove("admin_id")
      Cookie.remove("admin_name")
      Cookie.remove("session_id")
      Cookie.remove("role")
      router.push('/login');

    }
    return res;
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    router.push('/');
    return Promise.reject(error)
  }
)



export default service
