import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Proxy } from '../../share/models/proxy';


@Injectable()
export class ProxyService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getProxy(userId): Observable<Proxy[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Proxy[]>(environment.baseURL + '/api/proxy', { params: params });
  }

  createProxy(param) {
    console.log(JSON.stringify(param));
    return this.http.post(environment.baseURL + '/api/proxy', JSON.stringify(param), this.httpOptions)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  deleteAll(param) {
    const url = environment.baseURL + '/api/proxy';

    this.httpOptions['body'] = {
      'apiKey': param.apiKey
    };
    return this.http.delete(url, this.httpOptions);
  }

  getRegion(): Observable<String[]> {
    return this.http.get<String[]>(environment.baseURL + '/api/proxy/regions');
  }
}
