import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {

  auth0Options = {
    container: 'hiw-login-container',
    theme: {
      // logo: '../../../assets/profileaio.png',
      primaryColor: '#ea5323',
      displayName: 'Profile AIO',
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
    // autoclose: true,
    // oidcConformant: true,
  };

  lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

  constructor(private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      this.setSession(authResult);
      this.setProfile();
      this.router.navigate(['/']);
    });
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  login() {
    this.lock.show({container: 'hiw-login-container'});
  }

  logout() {
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

  public setProfile(): any {
    const token =  localStorage.getItem('access_token');
    this.lock.getUserInfo(token, (error, profile) => {
      if (error) {
        throw new Error(error);
      }
      localStorage.setItem('profile', JSON.stringify(profile));
    });
  }

  public getProfile(): any {
    return localStorage.getItem('profile');
  }
}
