var config = require('../../config.json');
var express = require("express");
var router = express.Router;
var userService = require('services/user.service');

// routes
router.post('/register', register);
// router.get('/', getAll);

 
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

// router.get("/api/contacts", function (req, res) {
//     db.collection(CONTACTS_COLLECTION).find({}).toArray(function (err, docs) {
//         if (err) {
//             handleError(res, err.message, "Failed to get contacts.");
//         } else {
//             res.status(200).json(docs);
//         }
//     });
// });



// router.post("/api/contacts", function (req, res) {
//     var newContact = req.body;
//     newContact.createDate = new Date();

//     if (!req.body.name) {
//         handleError(res, "Invalid user input", "Must provide a name.", 400);
//     } else {
//         db.collection(CONTACTS_COLLECTION).insertOne(newContact, function (err, doc) {
//             if (err) {
//                 handleError(res, err.message, "Failed to create new contact.");
//             } else {
//                 res.status(201).json(doc.ops[0]);
//             }
//         });
//     }
// });

// module.exports = router;