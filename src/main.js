// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store';
import FastClick from 'fastclick'
import App from './App'
import {AjaxPlugin, ConfirmPlugin, AlertPlugin, ToastPlugin, Flexbox, FlexboxItem, Popup, XHeader, PopupHeader, TransferDom } from 'vux'
import './assets/js/dpr'
import * as util from './util/util'

Vue.config.productionTip = false
FastClick.attach(document.body)

Vue.use(AjaxPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin, { time: 1000 })
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('popup', Popup)
Vue.component('x-header', XHeader)
Vue.component('popup-header', PopupHeader)
Vue.directive('transfer-dom', TransferDom)

let filterArr = ["num_format"]
Object.keys(util).forEach(key => {
  if (filterArr.indexOf(key) >= 0) Vue.filter(key, util[key])
})

const arr = ["detail", "fm", "comment"]
router.beforeEach((to, form, next) => {
  console.log(to);
  if (arr.indexOf(to.name.toLocaleLowerCase()) >= 0) {
    store.commit("playbarShowfn", {data: false})
  } else {
    store.commit("playbarShowfn", {data: true})
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app-box')
