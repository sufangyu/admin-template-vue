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
  // admin permission passed directly
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
/* eslint-disable no-console */
router.beforeEach((to, from, next) => {
  NProgress.start();

  if (getToken()) {
    // has token
    if (to.path === '/login') {
      // next({ path: '/' });
      next();
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        // 当前用户未获取完 user_info 信息, 发请求获取, 然后根据权限生成路由
        store.dispatch('getUserInfo').then((res) => {
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
    if (to.meta.roles && to.meta.roles.length > 0) {
      // 在免登录白名单，直接进入
      const redirectUrl = encodeURIComponent(to.path);
      next(`/login?redirect=${redirectUrl}`);
      NProgress.done();
    } else {
      // 否则全部重定向到登录页
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
