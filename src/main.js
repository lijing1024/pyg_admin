import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './http'
import moment from 'moment'
import VueQuillEditor from 'vue-quill-editor'

// 导入elment-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入富文本编辑器依赖的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

Vue.use(ElementUI, {size: 'small'})
Vue.use(VueQuillEditor)

// 全局配置axios
Vue.prototype.$axios = axios

// 设置为true,控制台的日志会更详细
Vue.config.productionTip = false

// 全局过滤器（格式化时间）
Vue.filter('ft', (v) => {
  return moment(v * 1000).format('YYYY-MM-DD hh:mm:ss')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
