import http from '@/utils/request';
import config from '@/config';


/**
 * 获取 用户列表
 *
 * @export
 * @returns
 */
export function getUsers(query = {}) {
  const url = `${config.API_BASE}/admin/users`;

  return http.get(url, query);
}


/**
 * 添加、编辑 用户
 *
 * @export
 * @param {*} data
 * @returns
 */
export function createAndEditUser(data) {
  let url = '';
  if (data.id && data.id !== '') {
    url = `${config.API_BASE}/admin/users/${data.id}`;
    return http.put(url, data);
  }

  url = `${config.API_BASE}/admin/users`;
  return http.post(url, data);
}


/**
 * 批量删除 用户
 *
 * @export
 * @param {*} id
 * @returns
 */
export function delUsers(users) {
  const data = {
    users,
  };
  const url = `${config.API_BASE}/admin/users`;

  return http.delete(url, {}, data);
}

/**
 * 更新用户 信息
 *
 * @export
 * @param {*} id
 * @returns
 */
export function updateUser(id, info) {
  const data = {
    info,
  };
  const url = `${config.API_BASE}/admin/users/${id}`;

  return http.patch(url, data);
}
