import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/';

const importComp = require('./_import_comp');

Vue.use(Router);

/* eslint-disable max-len */
/*
 * 单个路由自定义配置
 * hidden: true                   是否在 sidebar 显示. 默认 false
 * alwaysShow: true               是否总是在一级菜单显示, 不管是否有子路由. 没有设置, 则只有子路由时才会在菜单中显示
 * redirect: noredirect           redirect:noredirect 时,在面包屑中不会重定向
 * name: 'router-name'            在 <keep-alive> 使用 (必须设置!!!)
 * meta : {
     roles: ['admin','editor']    控制页面可访问的角色. 为空表示所有用户都可以访问
     title: 'title'               页面标题. 在子菜单 和 面包屑中显示 (推荐设置)
     icon: 'svg-name'             sidebar 显示的图标名称
     noCache: true                是否缓存页面. 默认是false
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
        icon: 'home',
        title: '控制台',
        noCache: true,
        roles: ['admin', 'editor'],
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
      title: '表单页',
      icon: 'form',
    },
    children: [
      {
        path: 'basic-form',
        component: importComp('form/base'),
        name: 'basicForm',
        meta: {
          title: '基础表单',
          desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
        },
      },
      {
        path: 'step-form',
        component: importComp('form/step'),
        name: 'stepForm',
        meta: {
          title: '分步表单',
          desc: '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。',
        },
      },
    ],
  },
  {
    path: '/clipboard',
    name: 'clipboard',
    component: Layout,
    redirect: 'clipboard/index',
    alwaysShow: true,
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
          title: '剪贴板示例',
        },
      },
    ],
  },
  {
    path: '/auth',
    name: '权限控制',
    component: Layout,
    redirect: 'auth/index',
    meta: {
      title: '权限控制',
      icon: 'auth',
    },
    children: [
      {
        path: 'index',
        name: 'authDemo',
        component: importComp('auth/index'),
        meta: {
          title: '所有用户可见',
          desc: '不同权限的用户, 显示不同的菜单入口',
        },
      },
      {
        path: 'admin',
        name: 'authAdmin',
        component: importComp('auth/admin'),
        meta: {
          title: '管理员可见',
          roles: ['admin'],
        },
      },
      {
        path: 'editor',
        name: 'authEditor',
        component: importComp('auth/editor'),
        meta: {
          title: '运营编辑',
          roles: ['editor'],
        },
      },
      {
        path: 'dev',
        name: 'authDev',
        component: importComp('auth/dev'),
        meta: {
          title: '开发者',
          roles: ['dev'],
        },
      },
    ],
  },
  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: importComp('i18n/index'),
        name: 'i18n',
        meta: {
          title: 'i18n',
          icon: 'international',
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
