import http from '@/utils/request';
import BASE_API from './config';


/**
 * 获取 列表
 *
 * @export
 * @param {*} query
 * @returns
 */
export function getArticleList(query) {
  const url = `${BASE_API}/articles`;

  return http.get(url, query);
}


/**
 * 获取 指定数据
 *
 * @export
 * @param {*} id
 * @param {*} query
 * @returns
 */
export function getAccount(id) {
  const url = `${BASE_API}/articles/${id}`;

  return http.get(url);
}


/**
 * 创建
 *
 * @export
 * @param {*} data
 * @returns
 */
export function createArticle(data) {
  const url = `${BASE_API}/articles/create`;

  return http.post(url, data);
}


/**
 * 更新
 *
 * @export
 * @param {*} data
 * @returns
 */
export function updateArticle(data) {
  const url = `${BASE_API}/articles/update`;

  return http.post(url, data);
}


/**
 * 更新 阅读量
 *
 * @export
 * @param {*} pv
 * @returns
 */
export function fetchPv(pv) {
  const url = `${BASE_API}/articles/pv`;

  return http.get(url, pv);
}
