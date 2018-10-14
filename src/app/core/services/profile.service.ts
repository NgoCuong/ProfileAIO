import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  public() {

    this.http.get(environment.baseURL + '/api/public')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  private() {
    this.http.get(environment.baseURL + '/api/private')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }
}
