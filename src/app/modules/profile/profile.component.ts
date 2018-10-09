import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(public auth: AuthService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => {
        this.profile = this.auth.getProfile();
      }
    );
  }

  ngOnInit() {
    this.profile = this.auth.getProfile();
  }
}
