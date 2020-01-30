const express = require('express');
const upload = require('../init/upload');
const { merchandise } = require('../config/upload');
const { getDate } = require('../utils/date');

const router = express.Router();

router.post(`/${merchandise}`, upload.single(merchandise), (req, res, next) => {
  return res.send(`/upload/${merchandise}/${getDate()}/${req.file.filename}`);
});

module.exports = router;