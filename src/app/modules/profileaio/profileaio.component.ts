import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

    this.userService.getUser()
      .subscribe(user => this.profileForm.address = user.googleUri);
  }

  public onSubmit() {
    this.profileService.downloadFile(this.profileForm);
  }
}
