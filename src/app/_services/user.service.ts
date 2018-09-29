import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_model/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: User) {
    console.log('User created');
    console.log(user);
    // return this.http.post('/api/users', user);
    return this.http.post('https://nameless-hollows-54410.herokuapp.com'
     + '/api/contacts', user);

  }

}
