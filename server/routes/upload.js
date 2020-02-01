const express = require('express');
const upload = require('../init/upload');
const { merchandise, advertisement } = require('../config/upload');
const { getDate } = require('../utils/date');
const advertisementController = require('../controller/AdvertisementController');

const router = express.Router();

router.post(`/${merchandise}`, upload.single(merchandise), (req, res) => {
  return res.json({
    code: 0,
    path: `/upload/${merchandise}/${getDate()}/${req.file.filename}`,
  });
});

router.post(`/${advertisement}`, upload.single(advertisement), (req, res) => {
  advertisementController.save(req, res, `/upload/${advertisement}/${getDate()}/${req.file.filename}`);
});

module.exports = router;