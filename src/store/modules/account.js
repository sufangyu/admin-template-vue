import formatRoles from '@/utils/formatRoles';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { loginByUsername, getAccount } from '@/api/accounts';


const user = {
  state: {
    account: {},
    roles: [],
    token: getToken(),
  },
  getters: {
    account: state => state.account,
    roles: state => state.roles,
  },
  actions: {
    // 退出登录
    logOut({ commit }) {
      return new Promise((resolve) => {
        commit('REESET_STATE');
        removeToken();
        resolve();
      });
    },
    // 获取用户信息
    getAccount({ commit }) {
      return new Promise(async (resolve, reject) => {
        const res = await getAccount();
        if (res.success) {
          // 验证返回的 roles 是否是一个非空数组
          const { data } = res;
          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', formatRoles(data.roles));
          } else {
            reject('roles must be a non-null array !');
          }
          commit('SET_ACCOUNT', data);
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    },
    // 用户名登录
    loginByUsername({ commit }, account) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await loginByUsername(account);
          if (!res.success) {
            resolve(res);
          } else {
            const { data } = res;
            setToken(data.token);
            commit('SET_TOKEN', data.token);
            resolve(res);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  mutations: {
    SET_ACCOUNT: (state, account) => {
      state.account = account;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    REESET_STATE: (state) => {
      state.token = '';
      state.roles = [];
      state.token = getToken();
    },
  },
};

export default user;
