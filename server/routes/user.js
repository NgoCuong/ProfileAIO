var express = require("express");
var router = express.Router;
var User = require("../models/user");

router.get("/api/contacts", function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(users);
        }
    })
});

router.post("/api/contacts", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var date = new Date();

    var newUser = { email: email, password: password, date: date };

    User.create(newUser, function (err, user) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(user);
        }
    });
});

module.exports = router;