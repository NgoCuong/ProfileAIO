import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {

  public userProfile: any;

  private auth0Options = {
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

  private lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

  constructor(private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }
        this.setSession(authResult, profile);
        this.userProfile = profile;
        this.router.navigate(['/']);
      });
    });
  }

  public login(): void {
    this.lock.show();
  }

  public logout(): void {
    this.removeSession();
    this.userProfile = undefined;
    this.router.navigate(['/']);
  }

  private setSession(authResult, profile): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  private removeSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      this.logout();
      return;
    }

    const self = this;
    this.lock.getUserInfo(accessToken, (err, profile) => {
      if (err) {
        this.logout();
        return;
      }

      self.userProfile = profile;
      cb(profile);
    });
  }

  public getProfileImage(): String {
    const profile = localStorage.getItem('profile');
    if (profile) {
      return JSON.parse(profile).picture;
    }
    return null;
  }
}
