import http from '@/utils/request';
import BASE_API from './config';


/**
 * 获取 短信验证码
 *
 * @export
 * @param {*} data
 * @returns
 */
export function getSMSCode(data) {
  const url = `${BASE_API}/global/sms`;

  return http.post(url, data);
}

export function temp() {}
