// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import axios from 'axios';
import router from './router'
import App from './App'

FastClick.attach(document.body)

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3333';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  render: h => h(App)
}).$mount('#app-box')
