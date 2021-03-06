import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store/index"
import toast from "./components/common/toast"
import FastClick from "fastclick"
import LazyLoad from "vue-lazyload"

Vue.config.productionTip = false
Vue.use(toast)
Vue.use(LazyLoad, {
  loading: './assets / img / commmon / placeholder.png'
})
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()

new Vue({
  render: (h) => h(App),
  router, store
}).$mount('#app')
