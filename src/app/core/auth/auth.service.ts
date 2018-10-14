import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {
  userProfile: any;

  auth0Options = {
    theme: {
      logo: '../../../assets/profileaio.png',
      primaryColor: '#DFA612'
    },
    languageDictionary: {
      title: 'Profile AIO'
    },
    auth: {
      redirectUrl: environment.auth0.callbackURL,
      responseType: 'token id_token',
      audience: `https://${environment.auth0.domain}/userinfo`,
      // params: {
      //   scope: 'openid profile'
      // }
    },
    autoclose: true,
    oidcConformant: true,
  };

  lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

  constructor(private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      this.setSession(authResult);
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }
        this.userProfile = profile;
        console.log(this.userProfile);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.router.navigate(['/']);
      });
    });
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public login() {
    this.lock.show();
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getToken(): string {
    return localStorage.getItem('id_token');
  }

  public getProfile(): any {
    return localStorage.getItem('profile');
  }

  public getProfileImage(): String {
    const proof = JSON.parse(localStorage.getItem('profile'));
    console.log(proof.picture);
    return proof.picture;
  }
}
