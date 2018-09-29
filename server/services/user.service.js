var config = require('../../config.json');
var _ = require('lodash');
// var jwt = require('jsonwebtoken');
// var bcrypt = require('bcryptjs');
var Q = require('q');
var mongoose = require('mongoose');
var db = mongoose.connect(config.connectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we connected");
});



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

