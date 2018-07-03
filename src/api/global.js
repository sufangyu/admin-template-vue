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


/**
 * 获取未读信息
 *
 * @export
 * @returns
 */
export function getUnreadMesages() {
  const url = `${BASE_API}/messages/unread`;

  return http.get(url);
}
