import Vue from 'vue'
import App from './App'
import router from './router'

// 导入elment-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入全局样式
import './assets/css/global.css'
Vue.use(ElementUI, {size: 'small'})

// 设置为true,控制台的日志会更详细
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
