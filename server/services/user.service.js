var config = require('../../config.json');
var _ = require('lodash');
// var jwt = require('jsonwebtoken');
// var bcrypt = require('bcryptjs');
var Q = require('q');
var mongodb = require("mongodb");

var ObjectID = mongodb.ObjectID;
var CONTACTS_COLLECTION = "contacts";
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");
});

router.get("/register", function (req, res) {
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    });
});

router.post("/register", function (req, res) {
    var newContact = req.body;
    newContact.createDate = new Date();

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
        db.collection(CONTACTS_COLLECTION).insertOne(newContact, function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create new contact.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

// var mongo = require('mongoskin');
// var db = mongo.db(config.connectionString, { native_parser: true });
// db.bind('users');

// var service = {};

// service.create = create;

// module.exports = service;

// function create(userParam) {
//     var deferred = Q.defer();

//     // validation
//     db.users.findOne(
//         { email: userParam.email },
//         function (err, user) {
//             if (err) deferred.reject(err.name + ': ' + err.message);

//             if (user) {
//                 // username already exists
//                 deferred.reject('Email "' + userParam.email + '" is already taken');
//             } else {
//                 createUser();
//             }
//         });

//     function createUser() {
//         // set user object to userParam without the cleartext password
//         var user = _.omit(userParam, 'password');

//         // add hashed password to user object
//         //user.hash = bcrypt.hashSync(userParam.password, 10);

//         db.users.insert(
//             user,
//             function (err, doc) {
//                 if (err) deferred.reject(err.name + ': ' + err.message);

//                 deferred.resolve();
//             });
//     }

//     return deferred.promise;
// }

