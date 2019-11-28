import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router/router'
import store from './store'
import vFilter from '@/utils/myFilter'
import echarts from 'echarts'
import '@/icons' // icon

// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
for (let key in vFilter){
  Vue.filter(key,vFilter[key])
}


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
