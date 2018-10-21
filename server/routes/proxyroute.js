/*
   Routes file used for API endpoint
   Buisness logic for each endpoint 
*/

var express = require('express');
var router = express.Router();
var proxy = require('./proxygenerator');
var http = require('./HttpRequest');

/*  
    API DOCUMENTATION : https://docs.google.com/spreadsheets/d/1WTLrAxsa7oFJMgAXAi5Blz2WA_kjjX88YbA0_XZrwB0/edit#gid=1554877026
*/


// Deletes all proxies for specified userId from database & provider
router.delete("/proxies", async function (req, res) {
    try {
        var apiKey = req.body.apiKey;
        var userId = req.user.sub;

        if (typeof userId === "undefined" || typeof apiKey === "undefined") {
            res.send(400, "Missing body elements");
            return;
        }

        var x = new proxy(apiKey);

        // Step 1. Validate API token
        await x.validateToken(apiKey);

        var proxySchema = require('./proxySchema');
        var response = await proxySchema.find({
            'userId': userId
        });

        if (response.length > 0) {
            // Step 2. Delete all proxies from servers
            await x.deleteAllInstances(apiKey);

            // Step 3. Delete all proxies from database
            await proxySchema.deleteMany({
                'userId': userId
            });

            res.send(200, "Delete successful.");
        } else {
            res.send(400, "userId, not found");
        }
    } catch (err) {
        res.send(err.statusCode);
    }
});


// Delete a proxy for specified userId from database & provider
router.delete("/proxy", async function (req, res) {
    try {
        var apiKey = req.body.apiKey;
        var proxyId = req.body.proxy;

        if (typeof proxyId === "undefined" || typeof apiKey === "undefined") {
            res.send(400, "Missing body elements");
        } else {
            var x = new proxy(apiKey);

            var proxySchema = require('./proxySchema');
            var response = await proxySchema.findOne({
                'proxy': proxyId
            });

            if (response != null) {
                var result = await x.deleteInstance(apiKey, response.instanceId)
                await response.delete();
                res.send(result);
            }
            res.send(400, "Not found");
        }

    } catch (err) {
        res.send(err.statusCode);
    }
});


// Get all regions for linode provider
router.get("/regions", async function (req, res) {

    var api = new http(this.accessToken);
    var response = await api.httpRequest('https://api.linode.com/v4/regions', 'get');
    var regions = [];

    for (var i = 0; i < response.results; ++i) {
        regions.push(response.data[i].id);
    }
    res.send(JSON.stringify(regions));
});


// Get all proxies for a userId
router.get("/proxies", async function (req, res) {
    try {
        var userId = req.user.sub == "null" ? null : req.user.sub;
        var proxy = require('./proxySchema');
        var query = proxy.find({
            'userId': userId
        });
        console.log(`Fetching proxies for ${userId}`)
        query.select('proxy region instanceId userId, server');
        query.exec(function (err, result) {
            res.send(result);
        });
    } catch (err) {
        console.log(err);
    }
});


// Create proxies for linode provider
router.post("/proxies", async function (req, res) {
    try {
        var apiKey = req.body.apiKey;
        var region = req.body.region;
        var user = req.body.user;
        var pass = req.body.pass;
        var number = req.body.number;
        var userId = req.user.sub;

        var x = new proxy(apiKey);
        var result = await x.generateProxies(userId, number, user, pass, region);
        res.send(result);
    } catch (err) {
        console.log(err);
        if (err instanceof RangeError) {
            console.log('No servers to generate proxies from');
        }
        else if (err.statusCode) {
            res.send(err.statusCode);
        } else {
            console.log(err);
        }
    }

});


module.exports = router;



