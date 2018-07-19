import http from '@/utils/request';
import BASE_API from '../config';


/**
 * 获取 权限菜单
 *
 * @export
 * @returns
 */
export function getMenus() {
  const url = `${BASE_API}/admin/menus`;

  return http.get(url);
}


/**
 * 添加、编辑 菜单
 *
 * @export
 * @param {*} data
 * @returns
 */
export function createAndEditMenu(data) {
  let url = '';
  if (data.id && data.id !== '') {
    url = `${BASE_API}/admin/menus/${data.id}`;
    return http.put(url, data);
  }

  url = `${BASE_API}/admin/menus`;
  return http.post(url, data);
}


/**
 * 删除 菜单
 *
 * @export
 * @param {*} id
 * @returns
 */
export function delMenu(id) {
  const url = `${BASE_API}/admin/menus/${id}`;

  return http.delete(url);
}
