import exampleObj from "./example.json";
import File from '../model/file';

/**
 * parse text file to html dom
 * @param {string} txt
 * @return {doms}
 */
const parseTxtToHTML = (txt) => {
  return txt.split("\n").filter((item) => item.trim().length > 0);
};

const isSameObject = (a, b) => {
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (!a || !b) return false;
  let k;
  for (k in a) {
    if (Object.prototype.hasOwnProperty.call(a, k)) {
      if (typeof a[k] === "function" && typeof b[k] === "function") {
        continue;
      }
      if (!Object.prototype.hasOwnProperty.call(b, k) || a[k] !== b[k]) {
        return false;
      }
    }
  }
  for (k in b) {
    if (
      Object.prototype.hasOwnProperty.call(b, k) &&
      !Object.prototype.hasOwnProperty.call(a, k)
    ) {
      return false;
    }
  }
  return true;
};

const MenuSelectStyle = {
  option: (provided, state) => {
    const { isDisabled } = state;
    return {
      ...provided,
      cursor: isDisabled ? "default" : "pointer",
    };
  },
  control: (provided) => ({
    ...provided,
    fontSize: "14px",
    cursor: "pointer",
    lineHeight: "1.5",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  indicatorSeparator: () => {},
};

const loadExample = () => {
  const files = [];
  for (const name in exampleObj) {
    const file = new File({
      name: name,
      detail: exampleObj[name],
    });
    files.push(file);
  }
  return files;
};

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';

const generatorBase64Code = (keyLength = 4) => {
  let key = '';
  for (let i = 0; i < keyLength; i++) {
    key += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return key;
};

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export {
  parseTxtToHTML,
  isSameObject,
  MenuSelectStyle,
  loadExample,
  generatorBase64Code,
  isMobile,
};
