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
    this.proxyService.getProxy('linode', this.auth.getUserID())
      .subscribe(proxyList => {
        this.proxyList = proxyList;
      });
  }

  delete(param) {
    // return this.proxyService.delete('linode', param);
  }

  onDeleteConfirm(event): void {
    // this.delete(event.data)
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //       event.confirm.resolve();
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
  }

  onMouseOver(event): void {
    // console.log(event);
  }
}
