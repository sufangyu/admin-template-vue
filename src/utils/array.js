export function arrayUtils() {}


/**
 * 分割数组
 *
 * @export
 * @param {*} [arr=[]] 原数组
 * @param {number} [size=100] 每页数组长度
 * @returns
 */
export function arraySplit(arr = [], size = 50) {
  const tmp = [];
  for (let i = 0; i < arr.length; i += size) {
    tmp.push(arr.slice(i, i + size));
  }
  return tmp;
}
