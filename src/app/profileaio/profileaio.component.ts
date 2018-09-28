import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../-services/profile.service';

@Component({
  selector: 'app-profileaio',
  templateUrl: './profileaio.component.html',
  styleUrls: ['./profileaio.component.css']
})
export class ProfileaioComponent implements OnInit {
  address: string;
  loading: Boolean = false;


  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  submit() {
    this.loading = true;
    this.profileService.sendUrl(this.address);
  }

}
