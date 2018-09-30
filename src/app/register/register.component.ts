import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { Register } from '../_model/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private newUser: Register;
  private loading = false;
  private confirmPassword: string;
  private error = false;

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.newUser = new Register();
  }

  register() {
    this.loading = true;
    this.userService.create(this.newUser)
      .subscribe(
        data => {
          console.log('Sucessfully Registered');
          this.router.navigate(['/login']);
        },
        error => {
          console.log('Register error: ' + error);
          this.loading = false;
          this.error = true;
        });
  }
}
