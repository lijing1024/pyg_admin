// 引入并配置axios
import axios from 'axios'

// 配置baseURL
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 拦截器
axios.interceptors.request.use(config => {
  // 将token信息追加到请求头中
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})
// 响应时判断token令牌是否失效
axios.interceptors.response.use(res => {
  if (res.data.meta.status === 401) {
    location.href = '/login'
  }
  else {
    return res
  }    
})
// 导出axios
export default axios
