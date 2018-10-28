var Proxy = require('../models/proxyModel');

exports.getProxies = async (req, res) => {
  try {
    var userId = req.user.sub;
    if (typeof userId === "undefined") {
      return res.status(403).json({ msg: "User is not logged in" });
    } 

    var query = Proxy.find({'userId': userId}, function(err, proxies) {
      if(err) {
        console.log(`Failed getting proxies for user:${userId}. Error:${err}`);
        return res.status(400).json({ msg: 'Failed getting proxies' });
      } else {
        console.log(`Succesfully getting proxies for user:${userId}`);
        return res.status(200).json(proxies);
      }
    });
  } catch (err) {
    console.log(`Failed getting proxies for user:${userId}. Error:${err}`);
    res.status(500).json({ msg: 'Failed getting proxies' });
  }
};
