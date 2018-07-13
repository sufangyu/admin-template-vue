import http from '@/utils/request';
import BASE_API from './config';


/**
 * 获取 短信验证码
 *
 * @export
 * @param {*} data
 * @returns
 */
export default function getException(status) {
  const url = `${BASE_API}/exception?status=${status}`;

  return http.get(url);
}
