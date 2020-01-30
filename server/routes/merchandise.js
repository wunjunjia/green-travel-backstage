const express = require('express');
const MerchandiseController = require('../controller/MerchandiseController');
const router = express.Router();

router.post('/save', (req, res) => {
  MerchandiseController.save(req, res);
});

router.get('/list', (req, res) => {
  MerchandiseController.list(req, res);
});

router.post('/singleDelete', (req, res) => {
  MerchandiseController.singleDelete(req, res);
});

router.post('/batchDelete', (req, res) => {
  MerchandiseController.batchDelete(req, res);
});

router.post('/edit', (req, res) => {
  MerchandiseController.edit(req, res);
});

router.get('/total', (req, res) => {
  MerchandiseController.total(req, res);
});

module.exports = router;