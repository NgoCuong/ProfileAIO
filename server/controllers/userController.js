var userSchema = require('../models/userModel');

exports.getUser = (req, res) => {
    try {
        var userId = req.user.sub;
        if (typeof userId === "undefined") {
            res.status(400).json({ msg: "User is not logged in" });
        } else {
            var userSchema = require('../models/userModel');
            var query = userSchema.findOne({
                'userId': userId
            });
            console.log(`Fetching user info for ${userId}`)
            query.select('userId userName linodeKey proxyUsername proxyPassword googleUri');
            query.exec(function (err, result) {
                return res.status(200).json(result);
            });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
};

exports.updateUser = (req, res) => {
    try {
      var userId = req.user.sub;
      if (typeof userId === "undefined") {
        res.status(400).json({ msg: "userId must be defined." });
      } else {
        var userName = req.body.userName == "undefined" ? "" : req.body.userName;
        var linodeKey = req.body.linodeKey == "undefined" ? "" : req.body.linodeKey;
        var proxyUsername = req.body.proxyUsername == "undefined" ? "" : req.body.proxyUsername;
        var proxyPassword = req.body.proxyPassword == "undefined" ? "" : req.body.proxyPassword;
        var googleUri = req.body.googleUri == "undefined" ? "" : req.body.googleUri;
  
        var userSchema = require('../models/userModel');
        var query = new userSchema({
          '_id': userId,
          'userId': userId,
          'userName': userName,
          'linodeKey': linodeKey,
          'proxyUsername': proxyUsername,
          'proxyPassword': proxyPassword,
          'googleUri': googleUri
        });
  
        query.save(async function (err) {
          if (err && err.code === 11000) {
            var userSchema = require('../models/userModel');
            Object.assign(userSchema, req.body);
            await userSchema.updateOne(
              { 'userId': userId },
              { $set: req.body },
              function (err, rawResponse) {
                if (err) throw err;
                if (rawResponse.n == 0) {
                  res.status(200).json({ msg: "User already exists, no new values to update values" });
                } else {
                  res.status(200).json({ msg: "User already exists, updated user values." });
                }
              }
            );
          } else {
            res.status(200).json({ msg: "User added successfully!" });
          }
        });
      }
    } catch (err) {
      res.status(400).json({ msg: err });
    }
};