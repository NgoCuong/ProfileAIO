import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
//   "{
//     ""linodeApiKey"": ""3c5686daacefc2ddde5545c15"",
//     ""userId"" : ""twitter|1231234234"",
//     ""defaultUserName: ""bob"",
//     ""defaultPassword"": ""testtest123123"",
//     ""googleApiKey"": ""123fd42fsdf132e12,
//     ""name"": ""yungyeezy"",
//     ""pictureUrl"":""asdasda.com"",
// }"
  profile: any;
  userSetting = {
    // linodeApiKey: String = '';
    // proxyUser: String = '';
    // proxyPass: String = '';
  };

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService) {}

  ngOnInit() {
    this.profile = JSON.parse(this.auth.getProfile());
  }

  onSave() {
    this.userSetting['userId'] = this.auth.getUserID();
    this.userSetting['name'] = 'young yeezy';
    this.userService.saveUserSettings(this.userSetting);
  }
}
