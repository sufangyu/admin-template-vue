/**
* @Author: jianglei
* @Date:   2017-10-12 12:06:49
*/
import Vue from 'vue';

/* eslint-disable no-underscore-dangle */
export default function treeToArray(data, expandAll, parent = null, level = null) {
  let tmp = [];
  Array.from(data).forEach((record) => {
    // 未设置展开属性, 添加属性
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll);
    }

    // 设置 level 层次
    let _level = 1;
    if (level !== undefined && level !== null) {
      _level = level + 1;
    }
    Vue.set(record, '_level', _level);

    // 如果有父级, 添加父级属性
    if (parent) {
      Vue.set(record, 'parent', parent);
    }

    tmp.push(record);

    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level);
      tmp = tmp.concat(children);
    }
  });
  return tmp;
}
