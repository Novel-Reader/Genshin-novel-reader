/**
 * parse text file to html dom
 * @param {string} txt
 * @return {doms} 
 */
const parseTxtToHTML = (txt) => {
  // 考虑性能问题：不能特别长
  // 1 把字符串剪切成数组（依据空格和换行符）
  // 第1章 转换的逻辑应该都在这里，View 层只做展示
  // 这个需要考虑不同的规则，例如，第一行默认是标题，两个换行章节，一个换行时普通分段等等，只能对指定的 TXT 生效
  return txt.split('\n').filter(item => item.trim().length > 0);
}

const isSameObject = (a, b) => {
  let k;
  for (k in a) {
    if (a.hasOwnProperty(k)) {
      if ((typeof a[k] === 'function' && typeof b[k] === 'function')) {
        continue;
      }
      if (!b.hasOwnProperty(k) || a[k] !== b[k]) {
        return false;
      }
    }
  }
  for (k in b) {
    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
      return false;
    }
  }
  return true;
}

const getLocalValue = (key) => {
  return window.localStorage.getItem(key);
}

const setLocalValue = (key, value) => {
  window.localStorage.setItem(key, value);
}

export {
  parseTxtToHTML,
  isSameObject,
  getLocalValue,
  setLocalValue,
};
