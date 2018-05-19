import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/';
// import LoginPage from '@/views/login/';

const importComp = require('./_import_comp');

Vue.use(Router);

/* eslint-disable max-len */
/*
 * router config
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
     roles: ['admin','editor']    will control the page roles (you can set multiple roles),
                                  if not set or empty, it mean all user can view.
     title: 'title'               the name show in submenu and breadcrumb (recommend set)
     icon: 'svg-name'             the icon show in the sidebar,
     noCache: true                if true ,the page will no be cached(default is false)
   }
 */

// 静态路由. 不需要权限检测
export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: importComp('dashboard/index'),
      meta: {
        roles: ['admin', 'editor'],
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true,
      },
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: importComp('login/index'),
    hidden: true,
  },
  {
    path: '/register',
    name: 'Register',
    component: importComp('register/index'),
    hidden: true,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: importComp('errorPage/404'),
    hidden: true,
  },
  {
    path: '/401',
    name: 'NoAuthority',
    component: importComp('errorPage/401'),
    hidden: true,
  },
];

// 异步动态路由
export const asyncRouterMap = [
  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart',
    },
    children: [
      {
        path: 'keyboard',
        component: importComp('charts/keyboard'),
        name: 'keyboardChart',
        meta: {
          title: 'keyboardChart',
          noCache: true,
        },
      },
      {
        path: 'line',
        component: importComp('charts/line'),
        name: 'lineChart',
        meta: {
          title: 'lineChart',
          noCache: true,
        },
      },
      {
        path: 'mixchart',
        component: importComp('charts/mixChart'),
        name: 'mixChart',
        meta: {
          title: 'mixChart',
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      roles: ['admin'],
      title: 'form',
      icon: 'form',
    },
    children: [
      {
        path: 'create-form',
        component: importComp('form/create'),
        name: 'createForm',
        meta: {
          roles: ['admin'],
          title: 'createForm',
          icon: 'table',
        },
      },
      {
        path: 'edit-form',
        component: importComp('form/edit'),
        name: 'editForm',
        meta: {
          roles: ['admin'],
          title: 'editForm',
          icon: 'table',
        },
      },
    ],
  },
  {
    path: '/clipboard',
    name: 'clipboard',
    component: Layout,
    redirect: 'clipboard/index',
    meta: {
      title: '剪贴板',
      icon: 'clipboard',
    },
    children: [
      {
        path: 'index',
        name: 'clipboardDemo',
        component: importComp('clipboard/index'),
        meta: {
          title: '点击复制',
          icon: 'clipboard',
        },
      },
      {
        path: 'index2',
        name: 'clipboardDemo2',
        component: importComp('clipboard/index'),
        meta: {
          title: '点击复制22',
          icon: 'clipboard22',
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
