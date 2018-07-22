import http from '@/utils/request';
import config from '@/config';


/**
 * 获取 角色列表
 *
 * @export
 * @returns
 */
export function getRoles() {
  const url = `${config.API_BASE}/admin-menus/roles`;

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
  const url = `${config.API_BASE}/admin-menus/roles/${id}`;

  return http.get(url);
}


/**
 * 添加、编辑 角色
 *
 * @export
 * @param {*} data
 * @returns
 */
export function createAndEditRoles(data) {
  let url = '';
  if (data.id) {
    url = `${config.API_BASE}/admin-menus/roles/${data.id}`;
    return http.put(url, data);
  }

  url = `${config.API_BASE}/admin-menus/roles`;
  return http.post(url, data);
}


/**
 * 删除 角色
 *
 * @export
 * @param {*} id
 * @returns
 */
export function delRole(id) {
  const url = `${config.API_BASE}/admin-menus/roles/${id}`;

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
  const url = `${config.API_BASE}/admin-menus/roles`;

  return http.delete(url, {}, data);
}
