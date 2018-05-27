import formatRoles from '@/utils/formatRoles';
import { getToken, setToken, removeToken } from '@/utils/auth';

// 模拟登录
const mockLoginByUsername = (userInfo) => {
  const promise = new Promise((resolve) => {
    const { username, password } = userInfo;
    /* eslint-disable no-fallthrough */
    switch (username) {
      case '':
        resolve({
          code: 1002,
          message: '用户名不能为空',
        });
      case 'admin':
        if (password !== 'asdasd') {
          resolve({
            code: 1001,
            message: '用户名或者密码错误',
          });
        } else {
          resolve({
            code: 1002,
            message: '登录成功',
            data: {
              name: 'Admin - Yu',
              avatar: '',
              token: '123456',
              roles: ['0'],
            },
          });
        }
        break;
      case 'editor':
        if (password !== 'asdasd') {
          resolve({
            code: 1001,
            message: '用户名或者密码错误',
          });
        } else {
          resolve({
            code: 1002,
            message: '登录成功',
            data: {
              name: 'Editor',
              avatar: '',
              token: '666666',
              roles: ['1'],
            },
          });
        }
        break;
      default:
        resolve({
          code: 1001,
          message: '用户名或者密码错误',
        });
        break;
    }
  });
  return promise;
};

const user = {
  state: {
    info: {},
    roles: [],
    token: getToken(),
  },
  getters: {
    account: state => state.info,
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
      return new Promise((resolve, reject) => {
        const token = getToken();
        let data = {};

        console.log('getAccount', token);

        if (token === '123456' || token === 'admin') {
          data = {
            name: 'Admin',
            avatar: '',
            token: '123456',
            roles: formatRoles(['0']),
          };
        } else if (token === '666666' || token === 'editor') {
          data = {
            name: 'Editor',
            avatar: '',
            token: '666666',
            roles: formatRoles(['1']),
          };
        } else {
          data = {
            name: 'Guest',
            avatar: '',
            token: '---',
            roles: formatRoles(['2']),
          };
        }

        // 验证返回的roles是否是一个非空数组
        if (data.roles && data.roles.length > 0) {
          commit('SET_ROLES', data.roles);
        } else {
          reject('roles must be a non-null array !');
        }

        console.log('获取用户信息 getAccount', data);
        commit('SET_ACCOUNT', data);
        resolve(data);
      });
    },
    // 用户名登录
    loginByUsername({ commit }, account) {
      return new Promise((resolve, reject) => {
        mockLoginByUsername(account).then((res) => {
          if (!res.data) {
            reject(res);
          }
          const { data } = res;
          commit('SET_TOKEN', data.token);
          commit('SET_ROLES', []);
          setToken(data.token);
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
  },
  mutations: {
    SET_ACCOUNT: (state, account) => {
      state.info = account;
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
