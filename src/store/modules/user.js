import formatRoles from '@/utils/formatRoles';
import { getToken, setToken } from '@/utils/auth';

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
    roles: [],
    token: getToken(),
  },
  getters: {
    roles: state => state.roles,
  },
  actions: {
    // 获取用户信息
    /* eslint-disable no-console */
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const token = getToken();
        let data = {};

        console.log('getUserInfo', token);

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

        console.log('获取用户信息 getUserInfo', data);
        resolve(data);
      });
    },
    // 用户名登录
    async loginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        mockLoginByUsername(userInfo).then((res) => {
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
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },
};

export default user;
