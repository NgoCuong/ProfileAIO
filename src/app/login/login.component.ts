import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: string;
  private password: string;
  private loading = false;

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.userService.login(this.email, this.password)
      .subscribe(
        data => {
          console.log('Sucessfully Registered');
          this.router.navigate(['/home']);
        },
        error => {
          console.log('Login failed: ' + error);
          this.loading = false;
        });
  }

}
