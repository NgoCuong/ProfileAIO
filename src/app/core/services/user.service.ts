import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/models/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public saveUserSettings(user: User): Observable<any> {
    return this.http.post(`${environment.baseURL}/api/user`, user);
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(`${environment.baseURL}/api/user`);
  }

  public deleteUser(): Observable<any> {
    return this.http.delete(`${environment.baseURL}/api/user`);
  }
}
