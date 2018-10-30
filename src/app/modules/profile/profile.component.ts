import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user';
import { _ } from 'underscore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  public userParam: User = {};
  public loading: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(userParam => {
        if (!_.isEmpty(userParam)) {
          this.userParam = userParam;
        }
      });
  }

  private onSave(): void {
    this.loading = true;
    console.log(this.userParam);
    this.userService.saveUserSettings(this.userParam)
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => this.loading = false
      );
  }

  private onDelete(): void {
    this.loading = true;
    this.userService.deleteUser()
      .subscribe(
        data => this.userParam = {},
        err => console.log(err),
        () => this.loading = false
      );
  }
}
