import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  sendUrl(address: string) {
    console.log(address);
    console.log(this.http.post('http://localhost:5000/profile/create', { url : address}));
    return this.http.post('http://localhost:5000/profile/create', { url : address});
  }

}
