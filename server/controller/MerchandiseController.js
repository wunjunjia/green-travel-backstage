const Merchandise = require('../model/Merchaindise');
const Pagination = require('../model/Pagination');
const MerchandiseService = require('../service/MerchandiseService');

class Condition {
  constructor({
    name,
  }) {
    this.name = name;
  }
}

function save(req, res) {
  const merchandise = new Merchandise(req.body);
  MerchandiseService
    .save(merchandise)
    .then(() => {
      res.json({ code: 0 });
    })
    .catch((e) => {
      console.log(e);
      res.json({ code: 1 });
    });
}

function list(req, res) {
  const pagination = new Pagination(req.query);
  const condition = new Condition(req.query);
  MerchandiseService
    .list({
      pagination,
      condition,
    })
    .then((result) => {
      res.json({ code: 0, data: result });
    })
    .catch((e) => {
      console.log(e);
      res.json({ code: 1 });
    });
}

function singleDelete(req, res) {
  const { id } = req.body;
  MerchandiseService
    .singleDelete(id)
    .then((result) => {
      // console.log(result.affectedRows);
      res.json({ code: 0 });
    })
    .catch((e) => {
      console.log(e);
      res.json({ code: 1 });
    });
}

function batchDelete(req, res) {
  const { ids } = req.body;
  MerchandiseService
    .batchDelete(ids)
    .then(() => res.json({ code: 0 }))
    .catch((e) => {
      console.log(e);
      res.json({ code: 1 });
    });
} 

function edit(req, res) {
  const merchandise = new Merchandise(req.body);
  MerchandiseService
    .edit(merchandise)
    .then(() => res.json({ code: 0 }))
    .catch((e) => {
      console.log(e);
      res.json({ code: 1 });
    });
}

function total(req, res) {
  const condition = new Condition(req.query);
  MerchandiseService
    .total(condition)
    .then((result) => res.json({ code: 0, data: result }))
    .catch((e) => {
      console.log(e);
      res.json({ code: 1 });
    });
}

module.exports = {
  save,
  list,
  singleDelete,
  edit,
  total,
  batchDelete,
};