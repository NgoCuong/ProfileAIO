var Proxy = require('../models/proxyModel');
var proxyGen = require('../services/linodeProxygenerator');
var http = require('../services/HttpRequest');
var statusMessage = require('../services/StatusMessage');
var proxyStatus = require('../models/proxyStatusModel');

exports.getRegions = async (req, res) => {
  var api = new http(this.accessToken);
  var response = await api.httpRequest('https://api.linode.com/v4/regions', 'get');
  var regions = [];

  for (var i = 0; i < response.results; ++i) {
    regions.push(response.data[i].id);
  }
  res.send(JSON.stringify(regions));
};

exports.getStatus = async (req, res) => {
  var userId = req.user.sub;
  if (typeof userId === "undefined") {
    return res.status(403).json({ msg: "User is not logged in" });
  }
  proxyStatus.findOne({ userId: userId, proxyProvider: "linode" }, function (err, status) {
    if (err) {
      console.log(`${err}`);
      return res.status(500).json({ msg: "server error" });
    }
    if (status) {
      return res.status(200).json(status);
    } else {
      console.log("Status not found");
    }
  });
}

exports.createProxy = async (req, res) => {
  try {
    var apiKey = req.body.apiKey;
    var region = req.body.region;
    var user = req.body.proxyUsername;
    var pass = req.body.proxyPassword;
    var number = req.body.number;
    var userId = req.user.sub;

    var x = new proxyGen(apiKey);
    statusMessage.setStatusMessage(userId, "linode", "Generating Proxy");
    var result = await x.generateProxies(userId, number, user, pass, region);
    res.status(200).json({ msg: result });
  } catch (err) {
    console.log(err);
    if (err instanceof RangeError) {
      console.log('No servers to generate proxies from');
    }
    else if (err.statusCode) {
      res.send(err.statusCode);
    } else {
      console.log(err);
    }
  }
};

exports.deleteAll = async (req, res) => {
  try {
    var apiKey = req.query.apiKey;
    var userId = req.user.sub;

    if (typeof userId === "undefined" || typeof apiKey === "undefined") {
      res.status(400).json({ msg: "Missing body elements" });
      return;
    }

    var x = new proxyGen(apiKey);

    // Step 1. Validate API token
    await x.validateToken(apiKey);
    var response = await Proxy.find({
      'userId': userId
    });

    if (response.length > 0) {
      // Step 2. Delete all proxies from servers
      await x.deleteAllInstances(apiKey);

      // Step 3. Delete all proxies from database
      await Proxy.deleteMany({
        'userId': userId
      });

      res.status(200).json({ msg: "Delete successful" });
    } else {
      res.status(400).json({ msg: "userId not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
};
