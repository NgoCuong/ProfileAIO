import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProxyService {

  constructor(private http: HttpClient) { }

  getProxy(param) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(JSON.stringify(param));
    this.http.post(environment.baseURL + '/api/proxy', JSON.stringify(param), httpOptions)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  /*
  /** POST: add a new hero to the server */
// addHero (hero: Hero): Observable<Hero> {
//   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
//     tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
//     catchError(this.handleError<Hero>('addHero'))
//   );
// }


  deleteAll(param) {
    const url = environment.baseURL + '/api/proxy';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        'token': param.token
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
