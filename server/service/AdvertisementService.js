const query = require('../init/mysql');

function save(advertisement) {
  return query('insert into advertisement(path, create_time, status) values(?, ?, ?)', [
    advertisement.path,
    advertisement.create_time,
    advertisement.status,
  ]);
}

module.exports = {
  save,
};