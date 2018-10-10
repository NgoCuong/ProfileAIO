var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
var mongoose = require ("mongoose"); // The reason for this demo.

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/profile", function(err, suc) {
//   if(err) {
//     console.log("Cannot connect to the database");
//     console.log(err);
//   } else {
//     console.log("Successfully connected to the database");
//   }
// });

// routes to api
//var userRoutes = require("./server/routes/user");
//app.use("/api", userRoutes);

var userRoutes = require("./server/routes/user.route");
app.use("/user", userRoutes);

var profileRoutes = require("./server/routes/profile.route");
app.use("/profile", profileRoutes);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

// start server
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});