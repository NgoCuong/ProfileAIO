import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProxyService {

  constructor(private http: HttpClient) { }

  getProxy(param) {
    console.log(param);
    console.log('sending poost requests: ' + JSON.stringify(param));
    this.http.post(environment.baseURL + '/api/proxy', param)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  deleteAll() {
    console.log('Deleting All Proxy');
    this.http.delete(environment.baseURL + '/api/proxy')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  getRegion():  Observable<String[]> {
    return this.http.get<String[]>(environment.baseURL + '/api/proxy/regions');
      // .subscribe(
      //   data => console.log(data),
      //   err => console.log(err)
      // );
  }
}
