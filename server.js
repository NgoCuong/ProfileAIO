var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
var mongoose = require ("mongoose"); 

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');


if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  //For local
  AUTH0_AUDIENCE= "https://sicko-mode.auth0.com/api/v2/";
  AUTH0_DOMAIN= "sicko-mode.auth0.com";
  AUTH0_JKSURI = `https://sicko-mode.auth0.com/.well-known/jwks.json`

  const corsOptions =  {
    origin: 'http://localhost:4200'
  };
  app.use(cors(corsOptions));
} else {
  //For Heroku
  AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
  AUTH0_AUDIENCE  = `https://${process.env.AUTH0_DOMAIN}/`;
  AUTH0_JKSURI = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;
}

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: AUTH0_JKSURI
  }),

  // Validate the audience and the issuer.
  aud: AUTH0_AUDIENCE,
  issuer: AUTH0_AUDIENCE,
  algorithms: ['RS256']
});

app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/profile", function(err, suc) {
  if(err) {
    console.log("Cannot connect to the database");
    console.log(err);
  } else {
    console.log("Successfully connected to the database");
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

// start server
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});