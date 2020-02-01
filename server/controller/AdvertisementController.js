const Advertisement = require('../model/Advertisement');
const advertisementService = require('../service/AdvertisementService');

function save(req, res, path) {
  const advertisement = new Advertisement({ path });
  advertisementService
    .save(advertisement)
    .then(() => {
      res.json({
        code: 0,
        path,
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({ code: 1 });
    });
}

module.exports = {
  save,
};