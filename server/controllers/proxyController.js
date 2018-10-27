var Proxy = require('../models/proxyModel');

exports.getProxies = async (req, res) => {
  try {
    var userId = req.user.sub == "null" ? null : req.user.sub;
    var proxy = require('../models/proxyModel');
    var query = proxy.find({
      'userId': userId
    });
    console.log(`Fetching proxies for ${userId}`)
    query.select('proxy region instanceId userId, server');
    query.exec(function (err, result) {
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
};