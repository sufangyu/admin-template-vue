import http from '@/utils/request';
import BASE_API from './config';


/**
 * 登录
 *
 * @export
 * @param {*} data
 * @returns
 */
export function loginByUsername(data) {
  const url = `${BASE_API}/account/login`;

  return http.post(url, data);
}


/**
 * 获取 账户信息
 *
 * @export
 * @returns
 */
export function getAccount() {
  const url = `${BASE_API}/account`;

  return http.get(url);
}


/**
 * 创建 账户
 *
 * @export
 * @param {*} data
 * @returns
 */
export function createAccount(data) {
  const url = `${BASE_API}/account/create`;

  return http.post(url, data);
}
