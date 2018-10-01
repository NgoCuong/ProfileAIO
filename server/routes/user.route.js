var express = require("express");
var router = express.Router();
var User = require("../models/user.model");
var Q = require('q');
var bcrypt = require('bcryptjs');


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
                deferred.reject('Email"' + req.body.email + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        var user = { email: email, password: password };

        // add hashed password to user object
        user.password = bcrypt.hashSync(password, 10);

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

router.post("/login", function (req, res) {
    var deferred = Q.defer();

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }, function (err, user) {
        if (err) 
            deferred.reject(err.name + ': ' + err.message);
        if(user  && bcrypt.compareSync(password, user.password)) {
            deferred.resolve(user);
        } else {
           deferred.resolve(); 
        }
    });
 
    deferred.promise.then(function (user) {
        if (user) {
            // authentication successful
            res.send(user);
        } else {
            // authentication failed
            res.status(400).send('Email or password is incorrect');
        }
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
});
 

module.exports = router;