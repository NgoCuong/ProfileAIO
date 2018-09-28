import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  create(user: any) {
    console.log('User created');
    console.log(user);
    // return this.http.post('/api/users', user);
  }

}
