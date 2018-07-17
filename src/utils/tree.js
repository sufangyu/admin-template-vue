/**
 * 树形结构化
 *
 * @export
 * @param {*} data 源数据
 * @param {string} [pid='0'] 父级 id
 * @param {number} [level=1] 层级
 * @param {string} [key='id'] 下一级父级的 key
 * @param {string} [pKey='parentId'] 父级 key
 * @param {string} [cKey='children'] 子项的 key
 * @returns
 */
export function treeify(data, pid = '0', level = 1, idKey = 'id', pKey = 'parentId', cKey = 'children') {
  const tree = [];
  let tmp;
  Array.from(data).forEach((item) => {
    if (item[pKey] === pid) {
      item.level = level;
      const childrenLevel = item.level + 1;
      tmp = treeify(data, item[idKey], childrenLevel);
      if (tmp.length > 0) {
        item[cKey] = tmp;
      }
      tree.push(item);
    }
  });
  return tree;
}


/**
 * 树结构转一维数组
 *
 * @export
 * @param {*} tree 源数据
 * @param {string} [cKey='children'] 子项的 key
 * @param {number} [level=1] 层次
 * @param {*} [map={}] 属性映射
 * @returns
 */
export function arrayify(tree, cKey = 'children', level = 1, map = {}) {
  let tmp = [];

  Array.from(tree).forEach((item) => {
    if (item.level === undefined) {
      item.level = level;
    }
    // 存在属性映射
    if (JSON.stringify(map) !== '{}') {
      for (const key in map) {
        if ({}.propertyIsEnumerable.call(map, key)) {
          const mapKey = map[key];
          item[mapKey] = item[key];
          delete item[key];
        }
      }
    }
    tmp.push(item);

    const childrenLevel = item.level + 1;
    if (item[cKey] && item[cKey].length > 0) {
      const children = arrayify(item.children, cKey, childrenLevel, map);
      tmp = tmp.concat(children);
    }
  });

  return tmp;
}
