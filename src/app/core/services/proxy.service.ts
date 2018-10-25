import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Proxy } from '../../shared/models/proxy';


@Injectable()
export class ProxyService {

  constructor(private http: HttpClient) { }

  public getProxies(): Observable<Proxy[]> {
    return this.http.get<Proxy[]>('/api/linode/proxies');
  }

  public createProxy(provider, data): Observable<any> {
    return this.http.post(`/api/${provider}/proxies`, data);
  }

  public deleteAll(provider, param): Observable<any> {
    return this.http.delete(`/api/${provider}/proxies`, {
      params: {
        'apiKey': param.apiKey
      }
    });
  }

  public getRegion(provider): Observable<String[]> {
    return this.http.get<String[]>(`/api/${provider}/regions`);
  }
}
