const query = require('../init/mysql');
const Merchandise = require('../model/Merchaindise');

function save(merchandise) {
  return query('insert into merchandise(name, description, path, integral) values(?, ?, ?, ?);', [
    merchandise.name,
    merchandise.description,
    merchandise.path,
    merchandise.integral,
  ]);
}

function list() {
  return query('select * from merchandise')
    .then((result) => {
      const merchandiseList = [];
      result.forEach(element => {
        merchandiseList.push(new Merchandise(element));
      });
      return merchandiseList;
    })
    .catch(e => Promise.reject(e));
}

module.exports = {
  save,
  list,
};