var express = require('express')
var router = express.Router();
var app = express()

var proxy = require('./proxygenerator');


router.post("/", async function (req, res) {

    var token = req.body.token;
    var region = req.body.region;
    var user = req.body.user
    var pass = req.body.pass;
    var number = req.body.number;

    var x = new proxy(token);
    
    var results = await x.generateProxies(number, user, pass, region);
    res.send(results);
});

router.delete("/", async function (req, res) {

    var token = req.body.token;
    var x = new proxy(token);
    
    var results = await x.deleteAllInstances();
    res.send(results);
})


module.exports = router;

