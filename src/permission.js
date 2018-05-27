// import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from '@/router';
import store from '@/store';
import { getToken } from '@/utils/auth';

// NProgress Configuration
NProgress.configure({ showSpinner: true });

/**
 * 判断是否有访问权限
 * @param {*} roles
 * @param {*} permissionRoles
 */
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) {
    return true;
  }
  if (!permissionRoles) {
    return true;
  }
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}


// @todo: has warning info "[vue-router] Duplicate named routes definition:"
/* eslint-disable no-lonely-if */
router.beforeEach((to, from, next) => {
  NProgress.start();

  if (getToken()) {
    // has token
    if (to.path === '/login') {
      next('/');
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        // 当前用户未获取完 user_info 信息, 发请求获取, 然后根据权限生成路由
        store.dispatch('getAccount').then((res) => {
          // note: roles must be a array! such as: ['editor','develop']
          const { roles } = res;
          store.dispatch('generateRoutes', { roles }).then(() => {
            // 根据权限动态添加可访问路由表
            router.addRoutes(store.getters.addRouters);
            next({ ...to, replace: true });
          });
        });
      } else {
        // 当前用户已获取完 user_info 信息
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          // 有访问权限
          next();
        } else {
          // 无访问权限
          next({ path: '/401', replace: true, query: { noGoBack: true } });
        }
      }
    }
  } else {
    // has no token
    if (to.matched.length === 0) {
      console.warn('no match router');
      // no match router
      next({ path: '/login', replace: true });
      NProgress.done();
    } else {
      // match router
      if (to.meta.roles && to.meta.roles.length > 0) {
        console.log('当前路由有角色控制, 重定向到登录页');
        const redirectUrl = encodeURIComponent(to.path);
        next({ path: `/login?redirect=${redirectUrl}`, replace: true });
        NProgress.done();
      } else {
        next();
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
