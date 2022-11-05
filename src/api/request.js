import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

var host
// process.env是nodejs提供的一个api,它返回一个包含用户信息的对象
// 通过NODE_ENV 判断当前环境是生产环境（production）还是开发环境（development）自动切换不同域名
// 暂时开发环境和生产环境 所以域名暂时一样
if (process.env.NODE_ENV == 'development') {
  // 开发环境
  host = 'http://shop.bufantec.com/bufan'
} else {
  host = 'http://shop.bufantec.com/bufan'
}
// 创建axios 实例
const instance = axios.create({
  baseURL: host,
  timeout: 5 * 1000
})

// 添加请求拦截器

instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // vant加载中
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    Toast.clear()
    return response.data
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Toast.clear()
    return Promise.reject(error)
  }
)

export default instance
