import Vue from 'vue';
import Router from 'vue-router';
import constantRouterMap from './constantRouter';
import asyncRouterMap from './asyncRouter';

Vue.use(Router);

// 静态路由. 不需要权限检测
export { constantRouterMap };

// 异步动态路由
export { asyncRouterMap };


export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap || [],
});
