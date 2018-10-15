import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  deleteAll(param) {
    const url = environment.baseURL + '/api/proxy';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        'token': param
      }
    };

    this.http.delete(url, httpOptions)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  getRegion(): Observable<String[]> {
    return this.http.get<String[]>(environment.baseURL + '/api/proxy/regions');
  }
}
