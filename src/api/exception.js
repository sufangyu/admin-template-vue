import http from '@/utils/request';
import config from '@/config';


/**
 * 异常请求
 *
 * @export
 * @param {*} data
 * @returns
 */
export default function getException(status) {
  const query = {
    status,
  };
  const url = `${config.API_BASE}/exception`;

  return http.get(url, query);
}
