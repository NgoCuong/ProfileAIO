import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-api-testing',
  templateUrl: './api-testing.component.html',
  styleUrls: ['./api-testing.component.css']
})
export class ApiTestingComponent implements OnInit {

  constructor(public profileService: ProfileService) { }

  ngOnInit() {
  }


  privateApi() {
    this.profileService.private();
  }

  publicApi() {
    this.profileService.public();
  }

}
