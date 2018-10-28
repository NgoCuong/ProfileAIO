import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  public canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.auth.login();
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}

