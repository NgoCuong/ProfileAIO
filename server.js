var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
var mongoose = require("mongoose");
var checkJwt = require('./server/auth');
const cors = require('cors');

// Only turn this on for Local
const corsOptions =  {
  origin: 'http://localhost:4200'
};
app.use(cors(corsOptions));

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Makes connection to Mongoose 
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/profile", { useNewUrlParser: true }, function (err, suc) {
//   if (err) {
//     console.log(err);
//   }
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/proxy', require('./server/routes/proxyroute'));

app.get('/api/public', function (req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

app.get('/api/private', checkJwt, function (req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

// start server
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});