import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proxy-menu',
  templateUrl: './proxy-menu.component.html',
  styleUrls: ['./proxy-menu.component.css']
})
export class ProxyMenuComponent implements OnInit {

  formType: String = 'DashBoard';
  createProxy = false;

  constructor() { }

  ngOnInit() {
  }

  createForm(type) {
    this.formType = type;
    this.createProxy = true;
  }

}
