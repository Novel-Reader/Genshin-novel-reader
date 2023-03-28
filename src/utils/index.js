import exampleObj from "./example.json";

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
  return txt.split("\n").filter(item => item.trim().length > 0);
};

const isSameObject = (a, b) => {
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (!a || !b) return false;
  let k;
  for (k in a) {
    if (Object.prototype.hasOwnProperty.call(a, k)) {
      if ((typeof a[k] === "function" && typeof b[k] === "function")) {
        continue;
      }
      if (!Object.prototype.hasOwnProperty.call(b, k) || a[k] !== b[k]) {
        return false;
      }
    }
  }
  for (k in b) {
    if (Object.prototype.hasOwnProperty.call(b, k) && !Object.prototype.hasOwnProperty.call(a, k)) {
      return false;
    }
  }
  return true;
};

const getLocalValue = (key) => {
  return window.localStorage.getItem(key);
};

const setLocalValue = (key, value) => {
  window.localStorage.setItem(key, value);
};

const MenuSelectStyle = {
  option: (provided, state) => {
    // const { isSelected, isFocused } = state;
    const { isDisabled } = state;
    return ({
      ...provided,
      cursor: isDisabled ? "default" : "pointer"
      // backgroundColor: isSelected ? '#20a0ff' : (isFocused ? '#f5f5f5' : '#fff'),
    });
  },
  control: (provided) => ({
    ...provided,
    fontSize: "14px",
    cursor: "pointer",
    lineHeight: "1.5"
  }),
  menuPortal: base => ({ ...base, zIndex: 9999 }),
  indicatorSeparator: () => {}
};

const loadExample = () => {
  const files = [];
  for (const item in exampleObj) {
    files.push({
      name: item,
      context: exampleObj[item]
    });
  }
  return files;
};

export {
  parseTxtToHTML,
  isSameObject,
  getLocalValue,
  setLocalValue,
  MenuSelectStyle,
  loadExample
};
