var express = require('express');
var router = express.Router();
var linodeProxyController = require('../controllers/linodeProxyController');
var proxyController = require('../controllers/proxyController');

router.route("/")
    .get(proxyController.getProxies);

router.route("/linode")
    .get(linodeProxyController.getStatus)
    .post(linodeProxyController.createProxy)
    .delete(linodeProxyController.deleteAll);

router.route("/linode/regions")
  .get(linodeProxyController.getRegions);

// Delete a proxy for specified userId from database & provider
// router.delete("/proxy", async function (req, res) {
//     try {
//         var apiKey = req.body.apiKey;
//         var proxyId = req.body.proxy;


//         if (typeof proxyId === "undefined" || typeof apiKey === "undefined") {
//             res.status(400).json({msg: "Missing body elements"});
//         } else {
//             var x = new proxy(apiKey);

//             var proxySchema = require('../models/proxyModel');
//             var response = await proxySchema.findOne({
//                 'proxy': proxyId
//             });

//             if (response != null) {
//                 var result = await x.deleteInstance(apiKey, response.instanceId)
//                 await response.delete();
//                 res.send(result);
//             }
//             res.status(400).json({msg: "Not found"});
//         }

//     } catch (err) {
//         res.status(400).json({msg: err});
//     }
// });

module.exports = router;
