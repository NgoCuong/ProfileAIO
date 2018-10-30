import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Proxy } from '../../shared/models/proxy';
import { ProxyStatus } from '../../shared/models/proxy-status';


@Injectable()
export class ProxyService {

  constructor(private http: HttpClient) { }

  public getStatus(provider): Observable<ProxyStatus> {
    return this.http.get<ProxyStatus>(`/api/proxy/${provider}`);
  }

  public getProxies(): Observable<Proxy[]> {
    return this.http.get<Proxy[]>('/api/proxy');
  }

  public createProxy(provider, data): Observable<any> {
    return this.http.post(`/api/proxy/${provider}`, data);
  }

  public deleteAll(provider, param): Observable<any> {
    return this.http.delete(`/api/proxy/${provider}`, {
      params: {
        'apiKey': param.apiKey
      }
    });
  }

  public getRegion(provider): Observable<String[]> {
    return this.http.get<String[]>(`/api/proxy/${provider}/regions`);
  }
}
