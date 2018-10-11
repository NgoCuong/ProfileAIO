import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProxyService {

  constructor(private http: HttpClient) { }

  getProxy() {
    console.log('Proxy Called');
  }

}
