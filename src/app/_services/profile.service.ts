import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }


  async sendUrl(address: string): Promise<Blob> {
    const file = await this.http.post<Blob>('http://localhost:5000/profile/create', { url : address}, 
      {
        responseType: 'blob' as 'json' 
      }).toPromise();
      return file;
  }

  // async sendUrl(address: String) {
  //   console.log(address);
  //   //console.log(this.http.post('http://localhost:5000/profile/create', { url : address}));
  //   return this.http.post('http://localhost:5000/profile/create', { url : address}, {
  //     responseType : 'blob',
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   });
      // .subscribe(res => {
      //   console.log(res);
      // });

    // var jsonobj = { name: "michille", age: 23};
    // var jsonData = "text/json;charset=utf-8, " + encodeURIComponent(JSON.stringify(jsonobj));
    // return 'data:' + jsonData;


  

}
