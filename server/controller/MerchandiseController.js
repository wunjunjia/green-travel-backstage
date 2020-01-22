const Merchandise = require('../model/Merchaindise');
const MerchandiseService = require('../service/MerchandiseService');

function save(req, res) {
  const merchandise = new Merchandise(req.body);
  MerchandiseService
    .save(merchandise)
    .then((result) => {
      res.json({ code: 0 });
    })
    .catch((e) => {
      res.json({ code: 1 });
    });
}

function list(req, res) {
  MerchandiseService
    .list()
    .then((result) => {
      res.json({ code: 0, data: result });
    })
    .catch((e) => {
      res.json({ code: 1 });
    });
}

module.exports = {
  save,
  list,
};