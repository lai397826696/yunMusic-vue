// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import axios from 'axios';
import router from './router'
import App from './App'
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.http.defaults.baseURL = 'http://localhost:3333';
Vue.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  render: h => h(App)
}).$mount('#app-box')
