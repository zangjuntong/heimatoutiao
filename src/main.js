import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入UI
import axios from './utils/requst'
import Component from './components'
import './prommise'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)

Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
