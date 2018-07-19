import http from '@/utils/request';
import config from '@/config';


/**
 * 登录
 *
 * @export
 * @param {*} data
 * @returns
 */
export function loginByUsername(data = {}) {
  const url = `${config.API_BASE}/accounts/login`;

  return http.post(url, data);
}


/**
 * 获取 账户信息
 *
 * @export
 * @returns
 */
export function getAccount() {
  const url = `${config.API_BASE}/account`;

  return http.get(url);
}


/**
 * 创建 账户
 *
 * @export
 * @param {*} data
 * @returns
 */
export function createAccount(data = {}) {
  const url = `${config.API_BASE}/accounts`;

  return http.post(url, data);
}
