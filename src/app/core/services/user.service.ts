import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/models/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public saveUserSettings(user: User) {
    console.log(user);
    return this.http.post(environment.baseURL + '/api/user', JSON.stringify(user), this.httpOptions);
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(environment.baseURL + '/api/user');
  }

  public deleteUser() {
    console.log('on delete');
    return this.http.delete(environment.baseURL + '/api/user', this.httpOptions);
  }

}
