import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Proxy } from '../../shared/models/proxy';


@Injectable()
export class ProxyService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getProxy(provider): Observable<Proxy[]> {
    return this.http.get<Proxy[]>(environment.baseURL + '/api/' + provider + '/proxies');
  }

  createProxy(provider, param) {
    console.log(JSON.stringify(param));
    console.log(provider);
    return this.http.post(environment.baseURL + '/api/' + provider + '/proxies', JSON.stringify(param), this.httpOptions)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  deleteAll(provider, param) {
    const url = environment.baseURL + '/api/' + provider + '/proxies';

    this.httpOptions['body'] = {
      'apiKey': param.apiKey
    };
    console.log(url);
    console.log(this.httpOptions['body']);
    return this.http.delete(url, this.httpOptions);
  }

//   api/linode/proxy	"{
//     ""apiKey"": ""3c5686daacefc2ddde5545c1"",
//      ""proxy"": ""102:163:34:12:4331:profileai:35sdf4#$""
// }"


  delete(provider, param) {
    const url = environment.baseURL + '/api/' + provider + '/proxy';
    this.httpOptions['body'] = {
      'apiKey': param.apiKey,
      'proxy': param.proxy
    };
    console.log(url);
    console.log(this.httpOptions['body']);
    return this.http.delete(url, this.httpOptions);
  }

  getRegion(provider): Observable<String[]> {
    return this.http.get<String[]>(environment.baseURL + '/api/' + provider + '/regions');
  }
}
