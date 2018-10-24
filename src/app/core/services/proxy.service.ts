import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Proxy } from '../../shared/models/proxy';


@Injectable()
export class ProxyService {

  constructor(private http: HttpClient) { }

  getProxies(): Observable<Proxy[]> {
    return this.http.get<Proxy[]>(`${environment.baseURL}/api/linode/proxies`);
  }

  createProxy(provider, param): Observable<any> {
    return this.http.post(environment.baseURL + '/api/' + provider + '/proxies', param);
  }

  deleteAll(provider, param): Observable<any> {
    return this.http.delete(`${environment.baseURL}/api/${provider}/proxies`, {
      params: {
        'apiKey': param.apiKey
      }
    });
  }

  getRegion(provider): Observable<String[]> {
    return this.http.get<String[]>(environment.baseURL + '/api/' + provider + '/regions');
  }
}
