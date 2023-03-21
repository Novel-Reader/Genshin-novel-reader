const fs = require('fs')

const getNewName =  (fileName, splitChar) => {
  const first = fileName.indexOf(splitChar);
  const last = fileName.lastIndexOf(splitChar);
  return fileName.substring(first + 1, last);
}

const dirName = `/Users/`;

let files = fs.readdirSync(dirName);

files.forEach((item, i) => {
  let newName = getNewName(item, '_') + '.png';
  fs.rename(`${dirName}/${item}`, `${dirName}/${newName}`, (err) => {
    if (err) throw err;
  });
});
