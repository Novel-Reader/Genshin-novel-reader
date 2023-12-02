var fs = require('fs');

// Problem: many existing files are copied from dtable or other places, without Chinese translation
// So use this script to traverse all files, find out all the codes of intl.get('xxx'), and print them out

/**
 * 1. Recursively iterates through files and folders to get the js file path
 * @param {array} files 
 * @param {string} father_path 
 * @returns null
 */
var getJSFiles = function(files, father_path) {
  if (!Array.isArray(files)) {
    return;
  }
  for (let i = 0; i < files.length; i++) {
    if (files[i] === '.DS_Store') {
      continue;
    }
    if (files[i].includes('.js')) {
      let newPath = father_path + '/' + files[i];
      res.push(newPath);
    }
    if (!files[i].includes('.')) {
      let newPath = father_path + '/' + files[i];
      let newFiles = fs.readdirSync(newPath);
      getJSFiles(newFiles, newPath);
    }
  }
}

var path = './src';
var files = fs.readdirSync(path);
var res = [];
getJSFiles(files, path);

// 2. Find all the translations contained in intl.get(', process this part of the translation
// then extract the string results line by line
let source_arr = [];
for (let j = 0; j < res.length; j++) {
  let content = fs.readFileSync(res[j], 'utf-8');
  let arr = content.split('\n');
  for (let k = 0; k < arr.length; k++) {
    let item = arr[k];
    // Only one translation in a row is currently considered
    if (item.includes('intl.get(\'')) {
      let index1 = item.indexOf('intl.get(\'');
      let index2 = Math.min(item.indexOf('\')', index1 + 9));
      // Only support basic `intl.get('xxx')`, not support `intl.get('xxx', { key: value })`
      source_arr.push(item.slice(index1 + 10, index2));
    }
  }
}

// 3. Find the json file and parse the existing translations
let target_path = './src/locale/en.js';
let target_dict = {};
let content = fs.readFileSync(target_path, 'utf-8');
let arr = content.split('\n');
for (let k = 0; k < arr.length; k++) {
  let item = arr[k];
  // Only one translation in a row is currently considered
  if (item.includes(':')) {
    let index2 = item.indexOf(':');
    let key = item.slice(3, index2 - 1);
    console.log(key);
    target_dict[key] = true;
  }
}

// 4. Find the difference set, and then there is no translation
let no_translation_arr = [];
source_arr.forEach(item => {
  if (!target_dict[item]) {
    no_translation_arr.push(item);
  }
});

if (no_translation_arr.length > 0) {
  console.log('Untranslated string: ');
  console.log(no_translation_arr);
} else {
  console.log('All translation strings are extracted');
}

