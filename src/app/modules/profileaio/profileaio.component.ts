import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-profileaio',
  templateUrl: './profileaio.component.html',
  styleUrls: ['./profileaio.component.css']
})
export class ProfileaioComponent implements OnInit {
  address: string;
  message: string;
  loading: Boolean = false;


  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  submit() {
    this.loading = true;
    // this.profileService.sendUrl(this.address);
  }

  privateApi() {
    this.profileService.private();
  }

  publicApi() {
    this.profileService.public();
  }

}
