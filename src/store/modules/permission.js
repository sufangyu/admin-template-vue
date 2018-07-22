import { asyncRouterMap, constantRouterMap } from '@/router';
import config from '@/config';
// import formatRoles from '@/utils/formatRoles';
import { getMenus } from '@/api/admin-menus/menus';


/**
 * 通过 meta.roles 判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  }
  return true;
}

/**
 * 通过角色过滤动态路由
 * 递归过滤异步路由表，返回符合用户角色权限的路由树
 *
 * @param asyncRouterMapArr
 * @param roles
 */
function filterAsyncRouterWithRoles(asyncRouterMapArr, roles) {
  const accessedRouters = asyncRouterMapArr.filter((route) => {
    const hasPermissioned = hasPermission(roles, route);
    if (hasPermissioned) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouterWithRoles(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}


/**
 * 通过动态菜单过来动态路由
 *
 * @param {*} asyncRouterMapArr
 * @param {*} menus
 */
function filterAsyncRouterWithMenus(asyncRouterMapArr, menus) {
  const accessedRouters = asyncRouterMapArr.filter((route) => {
    // 筛选符合条件的路由
    const matchMenu = menus.find(menu => menu.unique === route.name);

    // 是否有当前路由的访问权限
    let hasRoutePermission;
    if (route.meta && route.meta.requireAuth) {
      // 需要权限检测, 有权限访问
      hasRoutePermission = !!matchMenu;
    } else {
      // 不需要权限检测
      hasRoutePermission = true;
    }

    // 递归子路由
    if (route.children && route.children.length) {
      route.children = filterAsyncRouterWithMenus(route.children, menus);
      // 如果子路由有权限访问, 则当前路由也有权限访问
      if (route.children.length > 0 && !hasRoutePermission) {
        hasRoutePermission = true;
      }
    }
    // 为路由添加额外规则信息
    if (hasRoutePermission && route.meta) {
      route.meta.extraRules = matchMenu ? matchMenu.extraRules : [];
    }
    return hasRoutePermission;
  });
  return accessedRouters;
}


/**
 * 异步匹配路由角色信息
 *
 * @param {*} routerMap
 * @param {*} menus
 */
function asyncRouterRoles(routerMap, menus) {
  routerMap.forEach((route) => {
    const matcheMenu = menus.find(menu => menu.unique === route.name);
    if (matcheMenu) {
      // 已匹配路由菜单
      if (!route.meta) {
        route.meta = {};
      }
      let roles = route.meta.roles || [];
      // 去重处理
      roles = Array.from(new Set(roles.concat(matcheMenu.roles)));
      route.meta.roles = [...roles];
    }
    // 递归匹配子路由
    if (route.children && route.children.length > 0) {
      asyncRouterRoles(route.children, menus);
    }
  });
}


const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  getters: {
    permission_routers: state => state.routers,
    addRouters: state => state.addRouters,
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        const { roles, menus } = data;
        let accessedRouters;
        if (config.PERMISSION_TYPE === 'menus') {
          // 菜单模式匹配路由
          accessedRouters = filterAsyncRouterWithMenus(asyncRouterMap, menus);
        } else {
          // 角色模式匹配路由
          accessedRouters = filterAsyncRouterWithRoles(asyncRouterMap, roles);
        }
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    },
    // 异步匹配路由角色信息
    asyncRouterRoles() {
      return new Promise(async (resolve, reject) => {
        const res = await getMenus();
        if (res.success) {
          const routerMap = [...constantRouterMap, ...asyncRouterMap];
          asyncRouterRoles(routerMap, res.data);
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    },
    resetState({ commit }) {
      commit('RESET_COMMIT');
    },
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
    RESET_COMMIT: (state) => {
      state.routers = constantRouterMap;
      state.addRouters = [];
    },
  },
};

export default permission;
