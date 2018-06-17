import { asyncRouterMap, constantRouterMap } from '@/router';
import formatRoles from '@/utils/formatRoles';

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
 * 递归过滤异步路由表，返回符合用户角色权限的路由树
 * @param asyncRouterMapArr
 * @param roles
 */
function filterAsyncRouter(asyncRouterMapArr, roles) {
  const accessedRouters = asyncRouterMapArr.filter((route) => {
    const hasPermissioned = hasPermission(roles, route);
    if (hasPermissioned) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
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
        const { roles } = data;
        const accessedRouters = filterAsyncRouter(asyncRouterMap, formatRoles(roles));
        commit('SET_ROUTERS', accessedRouters);
        resolve();
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
