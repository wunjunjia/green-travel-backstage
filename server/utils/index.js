const fs = require('fs');
const path = require('path');
function padStart(value, flag) {
  return `${value}`.padStart(2, flag);
}

function uploadDirname(type) {
  const baseDir = path.join(__dirname, `../upload/${type}`);
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);
  const targetDir = `${baseDir}/${getDate()}`;
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
  return targetDir;
}

function uploadFilename(mimetype) {
  return `${Math.random().toString().slice(2)}.${mimetype.slice(mimetype.indexOf('/') + 1)}`;
}

function getDate() {
  const date = new Date();
  return `${date.getFullYear()}-${padStart(date.getMonth() + 1, '0')}-${padStart(date.getDate(), '0')}`;
}

module.exports = {
  uploadFilename,
  uploadDirname,
};