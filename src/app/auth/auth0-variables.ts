interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '2NqEEV5hpcusvbL-gjRFe6u1FHZT6muE',
  domain: 'sicko-mode.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
