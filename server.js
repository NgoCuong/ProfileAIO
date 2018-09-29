var express = require("express");
var bodyParser = require("body-parser");
//var mongodb = require("mongodb");
var path = require('path');

var config = require('./config.json');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// var ObjectID = mongodb.ObjectID;
// var CONTACTS_COLLECTION = "contacts";
// // Create a database variable outside of the database connection callback to reuse the connection pool in your app.
// var db;
// // Connect to the database before starting the application server.
// mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

//   // Save database object from the callback for reuse.
//   db = client.db();
//   console.log("Database connection ready");

// });
 
// start server
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});



// routes
var userRoutes = require("./server/controllers/user");
app.use("/user", userRoutes);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});







// // Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
//   console.log("ERROR: " + reason);
//   res.status(code || 500).json({ "error": message });
// }

