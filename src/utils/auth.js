import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

/**
 * 读取 账户权限
 */
export function getToken() {
  return Cookies.get(TokenKey);
}

/**
 * 设置 账户权限
 * @param {*} token
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

/**
 * 删除 账户权限
 */
export function removeToken() {
  return Cookies.remove(TokenKey);
}
