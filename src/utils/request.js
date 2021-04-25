import { setToken } from '../redux/actions/user'
import axios from 'axios'
import { message } from 'antd'
import { dealAmount } from '../utils/amount'
import { store } from '../redux/store'
import { BASE_URL } from '../config/api'
const uploadUrl = []
const noToastList = []

// 创建axios实例
const service = axios.create({
  baseURL: BASE_URL, // api 的 base_url
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.timestamp = Date.now()
    config.headers.nonceStr = Math.random()

    const token = store.getState().user.token
    if (token) config.headers.Authorization = token
    if (uploadUrl.filter((url) => config.url.includes(url)).length > 0) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    if (config.params) {
      config.params = dealAmount(config.params, 'out')
    }
    if (config.data) {
      config.data = dealAmount(config.data, 'out')
    }
    return config
  },
  (error) => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * code为非000000是抛错
     */

    let res = response.data
    const isNoToastList = noToastList.some(
      (item) => response.config.url.indexOf(item) > -1
    )
    const errno = res.errno
    if (errno !== 200 && !isNoToastList) {
      message.error(res.errmsg)
      if (errno === 10008 || errno === 3) {
        store.dispatch(setToken(null))
      }
      return Promise.reject(res)
    }
    res = dealAmount(res)
    return res
  },
  (error) => {
    if (error.toString().includes('Network Error')) {
      message.error('网络错误，请稍后再试')
    } else if (error.toString().includes('timeout')) {
      message.error('当前网络状况较差，请稍候再试')
    }
    return Promise.reject(error)
  }
)
export default service
