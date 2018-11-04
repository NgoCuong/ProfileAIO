import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../../../core/services/proxy.service';
import { Proxy } from '../../../shared/models/proxy';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-proxy-dashboard',
  templateUrl: './proxy-dashboard.component.html',
  styleUrls: ['./proxy-dashboard.component.css']
})
export class ProxyDashboardComponent implements OnInit {

  public proxies: Proxy[];

  constructor(private proxyService: ProxyService) { }

  ngOnInit() {
    this.getProxy();
  }

  private getProxy(): void {
    this.proxyService.getProxies()
      .subscribe(proxies => this.proxies = proxies);
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

  public copyClipboard(event) {
    const proxiesToCopy = this.proxies.map(proxies => proxies.proxy).join('\n');
    this.copyTextToClipboard(proxiesToCopy);
  }


  private copyTextToClipboard(val) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
