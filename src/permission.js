import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import config from '@/config';
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
  if (roles.includes('admin')) {
    return true;
  }
  if (!permissionRoles) {
    return true;
  }
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}


/* eslint-disable no-lonely-if */
router.beforeEach(async (to, from, next) => {
  NProgress.start();

  if (getToken()) {
    // has token
    if (to.path === '/login') {
      next('/');
      NProgress.done();
    } else {
      if (JSON.stringify(store.getters.account) === '{}') {
        if (config.PERMISSION_TYPE === 'roles' && config.IS_ASYNC_ROUTER_ROLES) {
          // 异步匹配路由角色信息
          await store.dispatch('asyncRouterRoles');
        }
        // 未获取用户信息, 发请求获取, 然后根据权限生成路由
        const { account, menus = [] } = await store.dispatch('getAccount');
        if (account) {
          await store.dispatch('generateRoutes', {
            roles: account.roles,
            menus,
          });
          // 根据权限动态添加可访问路由表
          router.addRoutes(store.getters.addRouters);
          next({ ...to, replace: true });
        }
      } else {
        if (to.matched.length === 0) {
          // 没有匹配到路由
          next({ path: '/404' });
        }
        // 已获取用户信息
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          // 有访问权限
          next();
        } else {
          // 无访问权限
          next({ path: '/401', query: { goback: true } });
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
      if (to.meta.requireAuth) {
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
