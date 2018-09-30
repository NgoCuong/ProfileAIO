import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../_model/register.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  create(newUser: Register) {
    console.log('User created');
    console.log(newUser);
    return this.http.post('https://nameless-hollows-54410.herokuapp.com'
     + '/user/register', { email : newUser.email, password: newUser.password });
  }

}
