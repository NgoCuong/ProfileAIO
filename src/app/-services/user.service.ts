import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: any) {
    console.log('User created');
    console.log(user);
    // return this.http.post('/api/users', user);
    return this.http.post('https://nameless-hollows-54410.herokuapp.com' + '/api/contacts', {'name': 'mLab Support', 'test': 'test' });

  }

}
