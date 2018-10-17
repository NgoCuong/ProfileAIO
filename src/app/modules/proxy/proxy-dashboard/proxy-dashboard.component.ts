import { Component, OnInit } from '@angular/core';
import { PROXIES } from '../../../core/services/mock-proxy';
import { SETTINGS } from './smart-table-settings';
import { ProxyService } from '../../../core/services/proxy.service';
import { AuthService } from '../../../core/auth/auth.service';

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
  data = PROXIES;

  ngOnInit() {
    this.proxyService.getProxy(this.auth.getUserID());
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
