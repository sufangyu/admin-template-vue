import axios from 'axios';
import { Message } from 'element-ui';
import { getToken, removeToken } from '@/utils/auth';
import router from '@/router';


let cancel;
const promiseArr = {};
const CancelToken = axios.CancelToken;

const request = (defaults = {}) => {
  // create an axios instance
  const instance = axios.create({
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': defaults.contentType || 'application/json;charset=utf-8',
    },
    timeout: defaults.timeout || 50000,
  });

  // request interceptor
  instance.interceptors.request.use(
    (config) => {
      // 发起请求时，取消掉当前正在进行的相同请求
      if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消');
        promiseArr[config.url] = cancel;
      } else {
        promiseArr[config.url] = cancel;
      }

      const token = getToken();
      if (token) {
        config.headers['Access-Token'] = token;
      }

      return config;
    },
    error => Promise.reject(error),
  );

  // response interceptor
  instance.interceptors.response.use(
    (response) => {
      const { data } = response;
      return Promise.resolve(data);
    },
    (error) => {
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '错误请求';
            break;
          case 401:
            error.message = '未授权，请重新登录';
            break;
          case 403:
            error.message = '拒绝访问';
            break;
          case 404:
            error.message = '请求错误，未找到该资源';
            break;
          case 405:
            error.message = '请求方法未允许';
            break;
          case 408:
            error.message = '请求超时';
            break;
          case 500:
            error.message = '服务器端出错';
            break;
          case 501:
            error.message = '网络未实现';
            break;
          case 502:
            error.message = '网络错误';
            break;
          case 503:
            error.message = '服务不可用';
            break;
          case 504:
            error.message = '网络超时';
            break;
          case 505:
            error.message = 'http版本不支持该请求';
            break;
          default:
            error.message = `连接错误${error.response.status}`;
        }
      } else {
        error.message = '连接到服务器失败';
      }

      const { status, statusText } = error.response;
      if (status === 401) {
        Message.error({
          message: error.message,
          onClose: () => {
            console.log('重定向到登录页面');
            router.replace('/login');
            removeToken();
            window.location.reload();
          },
        });
        return Promise.reject(error);
      }

      Message.error(error.message);
      return Promise.resolve({
        status,
        statusText,
        message: error.message,
      });
    },
  );

  return instance(defaults);
};


const http = {
  get(url, params, options) {
    const config = Object.assign({}, {
      method: 'GET',
      url,
      data: params,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    }, options);
    return request(config);
  },
  post: (url, data, options) => {
    const config = Object.assign({}, {
      method: 'POST',
      url,
      data,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    }, options);
    return request(config);
  },
};

export default http;