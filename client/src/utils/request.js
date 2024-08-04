/*
 * @Description: axios封装
 * @Author: Danylko
 * @Date: 2024-05-31 07:10:44
 * @LastEditTime: 2024-05-31 07:11:18
 */
import axios from 'axios'

// const BASE_URL = 'https://127.0.0.1:8080'

const request = axios.create({
  baseURL: '/api/',
  timeout: 10000 // 设置请求超时时间为10秒
})

// 创建一个请求队列
const requestQueue = new Map()
// 生成请求的唯一标识符
const generateRequsetKey = (config) => {
	const { method, url, params, data } = config
	return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}
// 添加请求到队列中
const addRequestToQueue = (config) => {
	const requestKey = generateRequsetKey(config)
	console.log("requestKey", requestKey)
	if (requestQueue.has(requestKey)) {
		return null
	}
	const cancelToken = axios.CancelToken.source()
	config.cancelToken = cancelToken.token
	requestQueue.set(requestKey, cancelToken)
	return config
}
// 从队列中移除请求
const removeRequestFromQueue = (config) => {
	const requestKey = generateRequsetKey(config)
	requestQueue.delete(requestKey)
}
// 请求拦截器
console.log(1)
request.interceptors.request.use((config) => {
	console.log(2)
	return addRequestToQueue(config) || Promise.reject(new axios.Cancel('Request Duplicate'))
}, (error) => {
	console.log(3)
	return Promise.reject(error)
})
// 响应拦截器
console.log("7")
request.interceptors.response.use((response) => {
	console.log("response", response)
	console.log(4)
	removeRequestFromQueue(response.config)
	return response 
}, (error) => {
	console.log(5)
	if (axios.isCancel(error)) {
		console.log('request canceled', error.message)
	} else {
		removeRequestFromQueue(error.config)
	}
	return Promise.reject(error)
})
export default request
