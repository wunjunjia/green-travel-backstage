const express = require('express');
const MerchandiseController = require('../controller/MerchandiseController');
const router = express.Router();

router.post('/save', (req, res) => {
  MerchandiseController.save(req, res);
});

router.get('/list', (req, res) => {
  MerchandiseController.list(req, res);
})

module.exports = router;