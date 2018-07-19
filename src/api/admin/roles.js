import http from '@/utils/request';
import config from '@/config';


/**
 * 获取 角色列表
 *
 * @export
 * @returns
 */
export function getRoles() {
  const url = `${config.API_BASE}/admin/roles`;

  return http.get(url);
}


/**
 * 获取 角色信息
 *
 * @export
 * @returns
 */
export function getRole(id = '') {
  if (!id) {
    console.warn('There has\'t role id');
    return false;
  }
  const url = `${config.API_BASE}/admin/roles/${id}`;

  return http.get(url);
}


/**
 * 添加 角色
 *
 * @export
 * @param {*} data
 * @returns
 */
export function createRole(data) {
  const url = `${config.API_BASE}/admin/roles`;
  return http.post(url, data);
}


/**
 * 编辑 角色
 *
 * @export
 * @param {*} data
 * @returns
 */
export function editRole(data) {
  const url = `${config.API_BASE}/admin/roles/${data.id}`;
  return http.put(url, data);
}


/**
 * 删除 角色
 *
 * @export
 * @param {*} id
 * @returns
 */
export function delRole(id) {
  const url = `${config.API_BASE}/admin/roles/${id}`;

  return http.delete(url);
}


/**
 * 批量删除 角色
 *
 * @export
 * @param {*} roles
 * @returns
 */
export function delRoles(roles) {
  const data = {
    roles,
  };
  const url = `${config.API_BASE}/admin/roles`;

  return http.delete(url, {}, data);
}
