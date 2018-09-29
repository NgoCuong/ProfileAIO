var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
//var config = require('./config.json');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


console.log("TEST STARTED");
// var http = require ('http');         // For serving a basic web page.
var mongoose = require ("mongoose"); // The reason for this demo.


// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect("mongodb://localhost/profile", function(err, suc) {
  if(err) {
    console.log("error connecting");
  
  } else {
    console.log("sucess");
  }
});

var userSchema = new mongoose.Schema({
  email: String,
  password: String
});

 var User = mongoose.model("User", userSchema);
// var boss = new User({
//    email: "boss",
//    password: "password"
// });
//add to db
// boss.save(function(err, cat) {
//   if(err) {
//     console.log("SOMETHONG WENT WRONG")
//   } else {
//     console.log(user);
//   }
// });

// User.find({}, function(err, users) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(users);
//   }
// })


app.get("/api/contacts", function(req, res) {
  User.find({}, function(err, users) {
    if(err) {
      handleError(res, err.message, "Failed to get contacts."); 
    } else {
      res.status(200).json(users);
    }
  })
});

app.post("/api/contacts", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  User.create({
    email: newContact.email,
    password: newContact.password
  }, function(err, user) {
    if(err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(user);
    }
  });

});



// start server
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});


// routes
// var userRoutes = require("./server/controllers/user");
// app.use("/user", userRoutes);



// // Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
//   console.log("ERROR: " + reason);
//   res.status(code || 500).json({ "error": message });
// }

