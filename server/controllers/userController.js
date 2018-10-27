var User = require('../models/userModel');

exports.getUser = (req, res) => {
  try {
    var userId = req.user.sub;
    if (typeof userId === "undefined") {
      return res.status(403).json({msg: "User is not logged in." });
    } else {
      var userQuery = User.findOne({userId: userId});
      userQuery.select('userId linodeKey proxyUsername proxyPassword googleUri');
      userQuery.exec(function (err, user) {
        if (err) {
          console.log(`Failed getting user: ${userId}. Error: ${err}`);
          return res.status(400).json({msg: 'Failed getting user settings'});
        } else {
          console.log(`Successfuly found user: ${userId}`);
          return res.status(200).json(user);
        }
      });
    }
  } catch (err) {
    console.log(`Failed getting user. Error: ${err}`);
    res.status(400).json({ msg: 'Failed getting user settings'});
  }
};

exports.updateUser = (req, res) => {
  try {
    var userId = req.user.sub;
    if (typeof userId === "undefined") {
      res.status(400).json({ msg: "User is not logged in." });
    } else {
      User.findOneAndUpdate({ userId: userId }, {
        userName: req.body.userName == undefined ? "" : req.body.userName,
        linodeKey: req.body.linodeKey == undefined ? "" : req.body.linodeKey,
        proxyUsername: req.body.proxyUsername == undefined ? "" : req.body.proxyUsername,
        proxyPassword: req.body.proxyPassword == undefined ? "" : req.body.proxyPassword,
        googleUri: req.body.googleUri == undefined ? "" : req.body.googleUri
      }, { upsert: true }, function (err, suc) {
        if (err) {
          console.log(`Failed updating user:${userId}. Error: ${err}`);
          res.status(400).json({ msg: err });
        } else {
          console.log(`Successfully updating User's Setting. User: ${userId}`);
          res.status(200).json({ msg: "Successfully Updated" });
        }
      });
    }
  } catch (err) {
    console.log(`Failed updating user. Error: ${err}`);
    res.status(400).json({ msg: err });
  }
};