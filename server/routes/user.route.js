var express = require("express");
var router = express.Router();
var User = require("../models/user.model");
var Q = require('q');

// router.get("/contacts", function (req, res) {
//     User.find({}, function (err, users) {
//         if (err) {
//             handleError(res, err.message, "Failed to get contacts.");
//         } else {
//             res.status(200).json(users);
//         }
//     })
// });

router.post("/register", function (req, res) {
    var deferred = Q.defer();

    var email = req.body.email;
    var password = req.body.password;

    // Check if email taken
    User.findOne(
        { email: req.body.email },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                console.log("name is taken");
                deferred.reject('Username "' + req.body.email + '" is already taken');
            } else {
                console.log("name is noot taken");
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        // var user = _.omit(userParam, 'password');

        // // add hashed password to user object
        // user.hash = bcrypt.hashSync(userParam.password, 10);

        var user = { email: email, password: password };
        User.create(
            user,
            function (err, newUser) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                console.log("successfully registered");
                deferred.resolve();
            });
    }
    deferred.promise.then(function () {
        res.json('successfully registered');
    }).catch(function (err) {
        res.status(400).send(err);
    });
});

module.exports = router;