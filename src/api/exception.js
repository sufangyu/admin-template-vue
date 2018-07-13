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
  const query = {
    status,
  };
  const url = `${BASE_API}/exception`;

  return http.get(url, query);
}
