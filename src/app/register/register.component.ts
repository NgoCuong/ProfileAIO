import { Component, OnInit } from '@angular/core';
import { UserService } from '../-services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }


  register() {
    this.loading = true;
    this.userService.create(this.model)
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

  //   register() {
  //       this.loading = true;
  //       this.userService.create(this.model)
  //           .subscribe(
  //               data => {
  //                   this.alertService.success('Registration successful', true);
  //                   this.router.navigate(['/login']);
  //               },
  //               error => {
  //                   this.alertService.error(error);
  //                   this.loading = false;
  //               });
  //   }


}
