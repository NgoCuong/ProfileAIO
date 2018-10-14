
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    //For local
    console.log("Setting env for local");
    AUTH0_AUDIENCE= "https://sicko-mode.auth0.com/api/v2/";
    AUTH0_DOMAIN= "sicko-mode.auth0.com";
    AUTH0_JKSURI = `https://sicko-mode.auth0.com/.well-known/jwks.json`
  

  } else {
    //For Heroku
    console.log("Setting env for heroku");
    AUTH0_AUDIENCE  = process.env.AUTH0_AUDIENCE;
    AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
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
    issuer: `https://${AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });

  module.exports = checkJwt;