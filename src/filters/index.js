import moment from 'moment';

export { parseTime, formatTime } from '@/utils';


/**
 * 格式化日期 - moment
 *
 * @export
 * @param {*} date
 * @param {string} [pattern = 'YYYY-MM-DD HH:mm:ss']
 * @returns
 */
export function formatDateWithMoment(date, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    console.warn('formatDateWithMoment func\'s date param is undefined');
    return '-';
  }

  return moment(date).format(pattern);
}
