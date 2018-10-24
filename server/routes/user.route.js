/*
   Routes file used for API endpoint
   Buisness logic for each endpoint 
*/

var express = require('express');
var router = express.Router();

/*  
    API DOCUMENTATION : https://docs.google.com/spreadsheets/d/1WTLrAxsa7oFJMgAXAi5Blz2WA_kjjX88YbA0_XZrwB0/edit#gid=1554877026
*/


// Delete a user from database
router.delete("/", async function (req, res) {
    try {
        var userId = req.user.sub;

        if (typeof userId === "undefined") {
            return res.status(403).json({msg: "Forbidden Access"});
        } else {
            var userSchema = require('./userSchema');
            var response = await userSchema.findOne({
                'userId': userId
            });

            if (response != null) {
                await response.delete();
                return res.status(200).json({msg: "Successfully Deleted"});
            }
            return res.status(400).json({msg: ""});
        }
    } catch (err) {
        return res.status(400).json(err);
    }
});


// Fetches user info from database
router.get("/", async function (req, res) {
    try {
        var userId = req.user.sub;
        if (typeof userId === "undefined") {
            res.status(400).json({msg: "Query parameter empty"});
        } else {
            var userSchema = require('./userSchema');
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
        res.status(400).json({msg: err});
    }
});


// Creates user entry into database
router.post("/", async (req, res) => {
    try {
        var userId = req.user.sub;
        if (typeof userId === "undefined") {
            res.status(400).json({msg: "userId must be defined."});
        } else {
            var userName = req.body.userName == "undefined" ? "" : req.body.userName;
            var linodeKey = req.body.linodeKey == "undefined" ? "" : req.body.linodeKey;
            var proxyUsername = req.body.proxyUsername == "undefined" ? "" : req.body.proxyUsername;
            var proxyPassword = req.body.proxyPassword == "undefined" ? "" : req.body.proxyPassword;
            var googleUri = req.body.googleUri == "undefined" ? "" : req.body.googleUri;

            var userSchema = require('./userSchema');
            var query = new userSchema({
                '_id': userId,
                'userId': userId,
                'userName': userName,
                'linodeKey': linodeKey,
                'proxyUsername': proxyUsername,
                'proxyPassword': proxyPassword,
                'googleUri': googleUri
            });

            await query.save(async function (err) {
                if (err && err.code === 11000) {
                    var userSchema = require('./userSchema');
                    Object.assign(userSchema, req.body);
                    await userSchema.updateOne(
                        { 'userId': userId },
                        { $set: req.body },
                        function (err, rawResponse) {
                            if (err) throw err;
                            if (rawResponse.n == 0) {
                                res.status(200).json({msg: "User already exists, no new values to update values"});
                            } else {
                                res.status(200).json({msg: "User already exists, updated user values."});
                            }
                        }
                    );
                } else {
                    res.status(200).json({msg: "User added successfully!"});
                }
            });
        }
    } catch (err) {
        res.status(400).json({msg: err});
    }
});


// Updates one or more user property
router.patch("/", async function (req, res) {
    try {
        var userId = req.user.sub;
        if (typeof userId === "undefined") {
            res.status(400).send({msg: "userId must be defined"});
        } else {

            var userSchema = require('./userSchema');
            Object.assign(userSchema, req.body);
            await userSchema.updateOne(
                { 'userId': userId },
                { $set: req.body },
                function (err, rawResponse) {
                    if (err) throw err;
                    if (rawResponse.n == 0) {
                        res.status(400).json({msg: "No values updated."});
                    } else {
                        res.status(200).json({msg: "Values updated successfully"});
                    }
                }
            );
        }
    } catch (err) {
        res.status(400).json({msg: err});
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
            res.status(200).json({msg: result});
        });
    } catch (err) {
        res.status(200).json({msg: "Failed to fetch all proxies"});
    }
});


module.exports = router;