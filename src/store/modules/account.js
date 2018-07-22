// import formatRoles from '@/utils/formatRoles';
import router from '@/router';
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
        removeToken();
        router.replace('/login');
        commit('REESET_STATE');
        resolve();
      });
    },
    // 获取用户信息
    getAccount({ commit }) {
      return new Promise(async (resolve, reject) => {
        const res = await getAccount();
        if (res.success) {
          // 验证返回的 roles 是否是一个非空数组
          const { account } = res.data;
          commit('SET_ROLES', (account.roles || []));
          commit('SET_ACCOUNT', account);
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
