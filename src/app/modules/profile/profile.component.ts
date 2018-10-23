import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  private user: User = {};

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(
        data => {
          if (data[0]) {
            console.log(data);
            this.user = data[0];
          }
        },
        err => console.log(err)
      );
  }

  private onSave(): void {
    this.userService.saveUserSettings(this.user)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  private onDelete(): void {
    this.userService.deleteUser()
      .subscribe(
        data => {
          console.log(data);
          this.user = {};
        },
        err => console.log(err)
      );
  }
}
