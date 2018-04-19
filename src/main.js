// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store';
import FastClick from 'fastclick'
import App from './App'
import { AjaxPlugin } from 'vux'
import './assets/js/dpr';

Vue.use(AjaxPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app-box')
