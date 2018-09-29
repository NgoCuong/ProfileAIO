var config = require('../../config.json');
var express = require("express");
var router = express.Router;
var userService = require('../services/user.service');

// routes
router.post('/register', register);
module.exports = router;

function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}