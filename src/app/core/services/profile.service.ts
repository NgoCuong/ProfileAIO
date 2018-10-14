import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  public() {

    this.http.get(environment.baseURL + '/api/public')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  private() {
    this.http.get(environment.baseURL + '/api/private')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }



  async sendUrl(address: string, param): Promise<Blob> {
    console.log("to profile " + encodeURI(param));
    const file = await this.http.post<Blob>('http://localhost:5000/profile/create/' + param.replace(" ", ""), { url : address}, 
      {
        responseType: 'blob' as 'json' 
      }).toPromise();
      return file;
  }

  async createxlsx(jsonresponse: string): Promise<Blob> {
    const file = await this.http.get<Blob>('http://localhost:5000/profile/testing', 
      {
        responseType: 'blob' as 'json' 
      }).toPromise();
      return file;

  }
}
