var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.route("/")
  .get(userController.getUser)
  .post(userController.updateUser)
  .delete(userController.deleteUser);

// Fetches all proxies on database
// router.get("/all/proxies", function (req, res) {
//   try {
//     var proxySchema = require('./proxySchema');
//     var query = proxySchema.find();
//     console.log(`Fetching all proxies`)
//     query.select('userId proxy region instanceId server');
//     query.exec(function (err, result) {
//       if (err) throw err;
//       res.status(200).json({ msg: result });
//     });
//   } catch (err) {
//     res.status(200).json({ msg: "Failed to fetch all proxies" });
//   }
// });


module.exports = router;