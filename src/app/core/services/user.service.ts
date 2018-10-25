import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/models/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public saveUserSettings(user: User): Observable<any> {
    return this.http.post('/api/user', user);
  }

  public getUser(): Observable<User> {
    return this.http.get<User>('/api/user');
  }

  public deleteUser(): Observable<any> {
    return this.http.delete('/api/user');
  }
}
