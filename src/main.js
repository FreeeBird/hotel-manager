import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  var d = new Date(value)
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
  // var hour = d.getHours();
  // var minutes = d.getMinutes();
  // var seconds = d.getSeconds();
  // return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
  return year + '-' + month + '-' + day
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
