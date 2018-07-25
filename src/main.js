// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store';
import FastClick from 'fastclick'
import App from './App'
import { AjaxPlugin, ConfirmPlugin, AlertPlugin, ToastPlugin } from 'vux'
import './assets/js/dpr';

Vue.config.productionTip = false
FastClick.attach(document.body)

Vue.use(AjaxPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin, { time: 1000 })
Vue.http.defaults.baseURL = 'http://localhost:3000';

router.beforeEach((to, form, next) => {
  // console.log(to);
  // if (form.path == "/" && form.matched.length == 0 && to.name!="home") {
  //   router.replace("/")
  // }
  console.log(to);
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app-box')
