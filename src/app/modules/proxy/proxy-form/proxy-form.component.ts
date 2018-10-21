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
  regions: String[] = [];

  onSubmitloading = false;
  onDeleteLoading = false;

  constructor(
    private proxyService: ProxyService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getRegions();
  }

  getRegions(): void {
    this.proxyService.getRegion(this.formType)
      .subscribe(regions => this.regions = regions);
  }

  submit() {
    this.proxyGen['userId'] = this.authService.getUserID();
    this.proxyGen['server'] = this.formType;
    this.onSubmitloading = true;
    this.proxyService.createProxy(this.formType, this.proxyGen);
  }

  deleteAll() {
    this.onDeleteLoading = true;
    this.proxyGen['userId'] = this.authService.getUserID();
    this.proxyService.deleteAll(this.formType, this.proxyGen)
      .subscribe(
        data => {
          console.log(data);
          this.onDeleteLoading = false;
        },
        err => {
          console.log(err);
          this.onDeleteLoading = false;
        }
      );
  }
}
