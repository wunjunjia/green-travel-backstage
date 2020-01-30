const fs = require('fs');
const { baseDir } = require('../config/upload');
const { getDate } = require('./date'); 

function uploadDirname(fieldname) {
  const LevelOneDir = `${baseDir}/${fieldname}`;
  if (!fs.existsSync(LevelOneDir)) fs.mkdirSync(LevelOneDir);
  const LevelTwoDir = `${LevelOneDir}/${getDate()}`;
  if (!fs.existsSync(LevelTwoDir)) fs.mkdirSync(LevelTwoDir);
  return LevelTwoDir;
}

function uploadFilename(mimetype) {
  return `${Math.random().toString().slice(2)}.${mimetype.slice(mimetype.indexOf('/') + 1)}`;
}

module.exports = {
  uploadDirname,
  uploadFilename,
};