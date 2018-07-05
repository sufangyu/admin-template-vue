export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if ((`''${time}`).length === 10) {
      time = parseInt(time, 10) * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    }

    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
  return timeStr;
}


/**
 * 格式化时间
 *
 * @export
 * @param {*} time
 * @param {*} option
 * @returns
 */
export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) { // less 1 hour
    return `${Math.ceil(diff / 60)}分钟前`;
  } else if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}小时前`;
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  }

  return `${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分${d.getSeconds()}秒`;
}


/**
 * 格式化 urlQuery
 *
 * @export
 * @param {*} url
 * @returns
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}


/**
 * 序列化 对象
 *
 * @export
 * @param {string} [query='{}']
 * @returns
 */
export function serialize(query = '{}') {
  const temp = [];
  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      const enValue = encodeURIComponent(query[key]);
      temp.push(`${key}=${enValue}`);
    }
  }
  return temp.join('&');
}


/**
 * 反序列化 字符串
 *
 * @export
 * @param {object} [query={}]
 * @returns
 */
export function deserialize(query = {}) {
  // 参数为空 或者 为空对象返回空对象
  if (!query || JSON.stringify(query) === '{}') {
    return {};
  }

  const reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
  const obj = {};
  while (reg.exec(query)) {
    obj[RegExp.$1] = decodeURIComponent(RegExp.$2);
  }
  return obj;
}
