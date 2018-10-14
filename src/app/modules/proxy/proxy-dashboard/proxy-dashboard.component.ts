import { Component, OnInit } from '@angular/core';
import { PROXIES } from '../../../core/services/mock-proxy';
import { SETTINGS } from './smart-table-settings';

@Component({
  selector: 'app-proxy-dashboard',
  templateUrl: './proxy-dashboard.component.html',
  styleUrls: ['./proxy-dashboard.component.css']
})
export class ProxyDashboardComponent implements OnInit {
  constructor() { }

  settings = SETTINGS;
  data = PROXIES;

  ngOnInit() {
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
