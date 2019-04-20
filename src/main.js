import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './http'

// 导入elment-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
Vue.use(ElementUI, {size: 'small'})

// 全局配置axios
Vue.prototype.$axios = axios

// 设置为true,控制台的日志会更详细
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
