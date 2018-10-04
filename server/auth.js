
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    //For local
    AUTH0_AUDIENCE= "https://sicko-mode.auth0.com/api/v2/";
    AUTH0_DOMAIN= "sicko-mode.auth0.com";
    AUTH0_JKSURI = `https://sicko-mode.auth0.com/.well-known/jwks.json`
  

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

  module.exports = checkJwt;