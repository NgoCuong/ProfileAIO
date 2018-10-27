var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.route("/")
  .get(userController.getUser)
  .post(userController.updateUser);

// Delete a user from database
router.delete("/", async function (req, res) {
  try {
    var userId = req.user.sub;

    if (typeof userId === "undefined") {
      return res.status(403).json({ msg: "Forbidden Access" });
    } else {
      var userSchema = require('../models/userModel');
      var response = await userSchema.findOne({
        'userId': userId
      });

      if (response != null) {
        await response.delete();
        return res.status(200).json({ msg: "Successfully Deleted" });
      }
      return res.status(400).json({ msg: "" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Updates one or more user property
router.patch("/", async function (req, res) {
  try {
    var userId = req.user.sub;
    if (typeof userId === "undefined") {
      res.status(400).send({ msg: "userId must be defined" });
    } else {

      var userSchema = require('../models/userModel');
      Object.assign(userSchema, req.body);
      await userSchema.updateOne(
        { 'userId': userId },
        { $set: req.body },
        function (err, rawResponse) {
          if (err) throw err;
          if (rawResponse.n == 0) {
            res.status(400).json({ msg: "No values updated." });
          } else {
            res.status(200).json({ msg: "Values updated successfully" });
          }
        }
      );
    }
  } catch (err) {
    res.status(400).json({ msg: err });
  }
})


// Updates all user properties
router.put("/", function (req, res) {
  try {
    res.send("will be implemented");
  } catch (err) {
    res.send(400, err);
  }
});


// Fetches all proxies on database
router.get("/all/proxies", function (req, res) {
  try {
    var proxySchema = require('./proxySchema');
    var query = proxySchema.find();
    console.log(`Fetching all proxies`)
    query.select('userId proxy region instanceId server');
    query.exec(function (err, result) {
      if (err) throw err;
      res.status(200).json({ msg: result });
    });
  } catch (err) {
    res.status(200).json({ msg: "Failed to fetch all proxies" });
  }
});


module.exports = router;