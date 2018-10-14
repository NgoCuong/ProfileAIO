import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { ProxyService } from '../../../core/services/proxy.service';

@Component({
  selector: 'app-proxy-form',
  templateUrl: './proxy-form.component.html',
  styleUrls: ['./proxy-form.component.css']
})
export class ProxyFormComponent implements OnInit {

  @Input() formType: string;

  proxyGen = {};
  Servers = ['Linode', 'X', 'Y', 'Z'];
  regions = [];

  constructor(
    private proxyService: ProxyService) { }

  ngOnInit() {
    this.proxyService.getRegion().subscribe(regions => this.regions = regions);
  }

  submit() {
    this.proxyService.getProxy(this.proxyGen);
  }

  deleteAll() {
    this.proxyService.deleteAll();
  }
}
