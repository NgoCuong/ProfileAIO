// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  auth0: {
    clientId: '2NqEEV5hpcusvbL-gjRFe6u1FHZT6muE',
    domain: 'sicko-mode.auth0.com',
    // callbackURL: 'http://localhost:4200/callback',
    callbackURL: 'https://nameless-hollows-54410.herokuapp.com/callback',
  },
  // baseURL: 'http://localhost:8080'
  baseURL: 'https://nameless-hollows-54410.herokuapp.com'
};
