import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { User } from '../_model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user: User;
  private loading = false;

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }


  register() {
    this.loading = true;
    this.userService.create(this.user)
      .subscribe(
        data => {
          console.log('Sucessfully Registered');
          this.router.navigate(['/login']);
        },
        error => {
          console.log('Register error: ' + error);
          this.loading = false;
        });
  }
}
