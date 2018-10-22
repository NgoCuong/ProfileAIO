import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  user: User;
  onLoading = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(
        data => {
          if(data[0]) {
            console.log('success');
            console.log(data);
            this.user = data[0];
          }
        }
      );
  }

  private onSave(): void {
    console.log(this.user);
    this.onLoading = true;
    this.userService.saveUserSettings(this.user)
      .subscribe(
        data => {
          console.log('success');
          console.log(data);
          this.onLoading = false;
        }
      );
  }

  private onDelete(): void {
    this.userService.deleteUser()
      .subscribe(
        data => {
          console.log('success');
          console.log(data);
          this.user = new User();
        }
      );
  }
}
