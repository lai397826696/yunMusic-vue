import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Tuijian from '@/pages/Tuijian'
import Fm from '@/pages/Fm'
import Detail from '@/pages/Detail'
import Comments from '@/pages/Comment';
import UserInfo from '@/pages/UserInfo';
import songSheet from '@/pages/songSheet';
import Rankings from '@/pages/rankings';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   alias: '/',
    //   component: Home
    // },
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
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/Comment/:id',
      name: 'comment',
      component: Comments
    },
    {
      path: '/userinfo/:id',
      name: 'userinfo',
      component: UserInfo
    },
    {
      path: '/songsheet',
      name: 'songsheet',
      component: songSheet
    },
    {
      path: '/rankings',
      name: 'rankings',
      component: Rankings
    }
  ]
})
