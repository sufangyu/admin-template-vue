import http from '@/utils/request';
import config from '@/config';


/**
 * 获取 账户列表
 *
 * @export
 * @returns
 */
export function getAccounts(query = {}) {
  const url = `${config.API_BASE}/accounts`;

  return http.get(url, query);
}


/**
 * 添加、编辑 账户账户
 *
 * @export
 * @param {*} data
 * @returns
 */
export function createAndEditAccount(data) {
  let url = '';
  if (data.id && data.id !== '') {
    url = `${config.API_BASE}/accounts/${data.id}`;
    return http.put(url, data);
  }

  url = `${config.API_BASE}/accounts`;
  return http.post(url, data);
}


/**
 * 批量删除 账户
 *
 * @export
 * @param {*} id
 * @returns
 */
export function delAccounts(accounts) {
  const data = {
    accounts,
  };
  const url = `${config.API_BASE}/accounts`;

  return http.delete(url, {}, data);
}

/**
 * 更新账户 信息
 *
 * @export
 * @param {*} id
 * @returns
 */
export function updateAccount(id, info) {
  const data = {
    info,
  };
  const url = `${config.API_BASE}/accounts/${id}`;

  return http.patch(url, data);
}
