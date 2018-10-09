import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-proxygen',
  templateUrl: './proxygen.component.html',
  styleUrls: ['./proxygen.component.css']
})
export class ProxygenComponent implements OnInit {
  dataCenter = ['Linode', 'X', 'Y', 'Z'];
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
