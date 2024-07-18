/*
 * @Description: 程序入口
 * @Author: Danylko
 * @Date: 2024-05-31 06:38:11
 * @LastEditTime: 2024-07-18 18:19:45
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/reset.css'
import '@/assets/styles/themes.less'

axios
  .get('/config.json')
  .then((res) => {
    const { variable } = res.data
    const app = createApp(App)
    app.provide('variable', variable)
    app.use(createPinia())
    app.use(router)
    app.use(ElementPlus)
    app.mount('#app')
  })
  .catch((error) => {
    console.error('Failed to load data.json:', error)
  })
