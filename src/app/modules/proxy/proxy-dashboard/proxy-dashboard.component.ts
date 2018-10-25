import { Component, OnInit } from '@angular/core';
import { SETTINGS } from './smart-table-settings';
import { ProxyService } from '../../../core/services/proxy.service';
import { Proxy } from '../../../shared/models/proxy';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-proxy-dashboard',
  templateUrl: './proxy-dashboard.component.html',
  styleUrls: ['./proxy-dashboard.component.css']
})
export class ProxyDashboardComponent implements OnInit {

  public proxies$: Observable<Proxy[]>;
  private settings = SETTINGS;

  constructor(private proxyService: ProxyService) { }

  ngOnInit() {
    this.getProxy();
  }

  private getProxy(): void {
    this.proxies$ = this.proxyService.getProxies();
  }

  private delete(param) {
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
}
