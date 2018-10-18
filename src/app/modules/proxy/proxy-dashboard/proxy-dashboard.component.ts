import { Component, OnInit } from '@angular/core';
import { SETTINGS } from './smart-table-settings';
import { ProxyService } from '../../../core/services/proxy.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Proxy } from '../../../share/models/proxy';

@Component({
  selector: 'app-proxy-dashboard',
  templateUrl: './proxy-dashboard.component.html',
  styleUrls: ['./proxy-dashboard.component.css']
})
export class ProxyDashboardComponent implements OnInit {
  constructor(
    private proxyService: ProxyService,
    private auth: AuthService) { }

  settings = SETTINGS;
  proxyList: Proxy[] = [];

  ngOnInit() {
    this.getProxy();
  }

  getProxy(): void {
    this.proxyService.getProxy(this.auth.getUserID())
      .subscribe(proxyList => {
        this.proxyList = proxyList;
      });
  }

  onDeleteConfirm(event): void {
    console.log('Deleted');
    console.log(event);
    event.confirm.resolve();
  }

  onMouseOver(event): void {
    // console.log(event);
  }
}
