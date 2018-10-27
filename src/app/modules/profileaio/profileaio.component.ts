import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _ } from 'underscore';

import { ProfileService } from '../../core/services/profile.service';
import { UserService } from '../../core/services/user.service';
import { ProfileForm } from '../../shared/models/profile-form';

@Component({
  selector: 'app-profileaio',
  templateUrl: './profileaio.component.html',
  styleUrls: ['./profileaio.component.css']
})

export class ProfileaioComponent implements OnInit {

  @ViewChild('downloadZipLink') private downloadZipLink: ElementRef;
  profileForm: ProfileForm = {};
  botList$: Observable<String[]>;

  constructor(
    private profileService: ProfileService,
    private userService: UserService) { }

  ngOnInit() {
    this.botList$ = this.profileService.getBotList();
    this.getUserSetting();
  }

  private getUserSetting(): void {
    this.userService.getUser()
      .subscribe(user => {
        if (!_.isEmpty(user)) {
          this.profileForm.address = user.googleUri;
        }
      });
  }

  public onSubmit(): void {
    this.profileService.downloadFile(this.profileForm);
  }
}
