import localforage from "localforage";

async function getLocalValue(key) {
  return await localforage.getItem(key);
};

function setLocalValue(key, value) {
  localforage.setItem(key, value);
};

export const NOVEL_READER_STYLE_SAVE_KEY = "novel-reader-style";
export const LOCAL_NOVELS_SAVE_KEY = "local-novels";
export const FOLDER_TREE_SAVE_KEY = 'folder-tree';

export { getLocalValue, setLocalValue };
