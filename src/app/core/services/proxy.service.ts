import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProxyService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getProxy(param) {
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
      'token': param.token
    };

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   }),
    //   body: {
    //     'token': param.token
    //   }
    // };

    return this.http.delete(url, this.httpOptions);
  }

  getRegion(): Observable<String[]> {
    return this.http.get<String[]>(environment.baseURL + '/api/proxy/regions');
  }
}
