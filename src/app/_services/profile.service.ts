import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  constructor(private authHttp: AuthHttp) { }

  public() {

    // this.authHttp.get('http://localhost:8080/api/public')
    this.authHttp.get('http://localhost:8080/api/public')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  private() {

    // this.authHttp.get('http://localhost:8080/api/private')
    this.authHttp.get('https://nameless-hollows-54410.herokuapp.com/api/private')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }
}
