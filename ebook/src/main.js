// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/styles/icon.css'
import '@/assets/styles/global.scss'
//vuex
import store from './store'
// 手指滑动
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
VueTouch.config.swipe = {
  threshold: 10 //手指左右滑动距离
}
// layer弹出框
import layer from 'vue2-layer-mobile'
Vue.use(layer, {
  
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用store
  components: { App },
  template: '<App/>'
})