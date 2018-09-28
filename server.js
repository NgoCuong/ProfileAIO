var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var path = require('path');
var routes = require('./server/routes/createProfileRoutes');
var ObjectID = mongodb.ObjectID;
port = 1987;
var CONTACTS_COLLECTION = "contacts";
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
routes(app);
// app.listen(port);
// console.log("API server started on port: " + port);

// var app = express();
// app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use('*', (req, res, next) => {
  res.status(200).json({ success: false, message: 'Does not match any resource of the routing.' });
});
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
// var db;

// // Connect to the database before starting the application server.
//  mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
//    if (err) {
//      console.log(err);
//      process.exit(1);
//    }

//    // Save database object from the callback for reuse.
//    db = client.db();
//    console.log("Database connection ready");


// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});



//  // SAMPLE REST API BELOW
// // CONTACTS API ROUTES BELOW


// // Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
//   console.log("ERROR: " + reason);
//   res.status(code || 500).json({"error": message});
// }

// /*  "/api/contacts"
//  *    GET: finds all contacts
//  *    POST: creates a new contact
//  */

// app.get("/api/contacts", function(req, res) {
//   db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
//     if (err) {
//       handleError(res, err.message, "Failed to get contacts.");
//     } else {
//       res.status(200).json(docs);
//     }
//   });
// });



// app.post("/api/contacts", function(req, res) {
//   var newContact = req.body;
//   newContact.createDate = new Date();

//   if (!req.body.name) {
//     handleError(res, "Invalid user input", "Must provide a name.", 400);
//   } else {
//     db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
//       if (err) {
//         handleError(res, err.message, "Failed to create new contact.");
//       } else {
//         res.status(201).json(doc.ops[0]);
//       }
//     });
//   }
// });

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

// app.get("/api/contacts/:id", function(req, res) {
// });

// app.put("/api/contacts/:id", function(req, res) {
// });

// app.delete("/api/contacts/:id", function(req, res) {
// });




// DONT REMOVE THIS. THIS SHOULD BE AT THE END OF FILE.
// Send all other requests to the Angular app
// routes(routes);
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});