import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Tuijian from '@/pages/Tuijian'
import Fm from '@/pages/Fm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/tuijian',
      name: 'tuijian',
      component: Tuijian
    },
    {
      path: '/fm',
      name: 'fm',
      component: Fm
    }
  ]
})
