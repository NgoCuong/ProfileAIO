/*
   Routes file used for API endpoint
   Buisness logic for each endpoint 
*/

var express = require('express')
var router = express.Router();

var proxy = require('./proxygenerator');
var http = require('./HttpRequest');

/*  
    API Endpoint: POST - /api/proxy
    Used to create proxies, requires body
    Ex. Json Body
    {   
        "token": "3c5686daacefc2ddde5545c155f1de8cadba10321233685ff2f622ebc98285c70",
        "region": "us-west",
        "user": "profileaio",
        "pass": "10dOlLaRpRofItNoTBaD",
        "number": 2
    } 
*/
router.post("/", async function (req, res) {

    try {
        var apiKey = req.body.apiKey;
        var region = req.body.region;
        var user = req.body.user
        var pass = req.body.pass;
        var number = req.body.number;
        var userId = req.body.userId;

        var x = new proxy(apiKey);
        var result = await x.generateProxies(userId, number, user, pass, region);
        res.send(result);
    } catch (err) {

        console.log(err);
        if (err instanceof RangeError) {
            console.log('No servers to generate proxies from');
        }
        else {
            res.send(err.statusCode);
        }
    }

});


/* API Endpoint: GET - /api/proxy
   Used to fetch proxies from database */
router.get("/", async function (req, res) {

    try {
        var userId = req.query.userId;
        var proxy = require('./proxySchema');
        var query = proxy.find({
            'userId':userId
        });
        query.select('proxy region instanceId userId');
        query.exec(function (err, result) {
            res.send(result);
        });
    } catch (err) {
        console.log(err);
    }
});


/* API Endpoint: DELETE - /api/proxy
   Used to decomission all proxies */
router.delete("/", async function (req, res) {

    try {
        var apiKey = req.body.apiKey;
        var x = new proxy(apiKey);

        var results = await x.deleteAllInstances();
        res.send(results);
    } catch (err) {
        res.send(err.statusCode);
    }

});


/* API Endpoint: GET - /api/proxy/regions
   Used to get all supported regions on linode */
router.get("/regions", async function (req, res) {

    var api = new http(this.accessToken);
    var response = await api.httpRequest('https://api.linode.com/v4/regions', 'get');
    var regions = [];

    for (var i = 0; i < response.results; ++i) {
        regions.push(response.data[i].id);
    }
    res.send(JSON.stringify(regions));
});


module.exports = router;