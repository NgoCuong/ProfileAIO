import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  navigationSubscription: any;

  constructor(private router: Router, private auth: AuthService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {
  }

  initialiseInvites() {
    // const auth0Options = {
    //   container: 'hiw-login-container',
    //   theme: {
    //     primaryColor: '#ea5323',
    //     displayName: 'Profile AIO',
    //   },
    //   languageDictionary: {
    //     title: 'Profile AIO'
    //   },
    //   auth: {
    //     redirectUrl: environment.auth0.callbackURL,
    //     responseType: 'token id_token',
    //     audience: `https://${environment.auth0.domain}/userinfo`,
    //   },
    // };

    // const lock = new Auth0Lock(
    //   environment.auth0.clientId,
    //   environment.auth0.domain,
    //   auth0Options
    // );

    this.auth.lock.show({container: 'hiw-login-container'});
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
   }
  }
}
