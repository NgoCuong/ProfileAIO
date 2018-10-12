import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { ProxyService } from '../../core/services/proxy.service';

@Component({
  selector: 'app-proxygen',
  templateUrl: './proxygen.component.html',
  styleUrls: ['./proxygen.component.css']
})
export class ProxygenComponent implements OnInit {

  proxyGen = {};
  Servers = ['Linode', 'X', 'Y', 'Z'];
  Locations = ['us-west', 'Chicago', 'Freemont'];

  constructor(public auth: AuthService, private proxyService: ProxyService) { }

  ngOnInit() {
  }

  submit() {
    this.proxyService.getProxy(this.proxyGen);
  }

  deleteAll() {
    this.proxyService.deleteAll();
  }
}
