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
  public loading: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getUser()
      .subscribe(
        user => this.user = user,
        error => console.log(error),
        () => this.loading = false
      );
  }

  private onSave(): void {
    this.loading = true;
    this.userService.saveUserSettings(this.user)
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
        data => this.user = {},
        err => console.log(err),
        () => this.loading = false
      );
  }
}
