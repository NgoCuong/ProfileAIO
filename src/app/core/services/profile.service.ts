import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { saveAs } from 'file-saver';


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

<<<<<<< HEAD


  async sendUrl(address: string, param): Promise<Blob> {
    var filename;
    const file = await this.http.post<Blob>('http://localhost:5000/profile/create/' + param.replace(" ", "").toLowerCase(), { url : address}, 
=======
  async sendUrl(address: string, toProfile: string): Promise<Blob> {
    const file = await this.http.post<Blob>('http://localhost:5000/profile/create', { url : address}, 
>>>>>>> develop
      {
        responseType: 'blob' as 'json'
      }).toPromise();
      // var contentDispositionHeader = httpResponse.headers('Content-Disposition');

    // console.log

    return file;
  }

  getFileNameFromHttpResponse(httpResponse) {
    var contentDispositionHeader = httpResponse.headers.get('Content-Disposition');
    var result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }

  async downloadFile(address: string, param){
    var fileName;
    await this.http.post<any>('http://localhost:5000/profile/create/' + param.replace(" ", ""), { url : address}, {
      responseType: 'blob' as 'json',
      observe: 'response' as 'response'

    }).subscribe((res: HttpResponse<any>) => {
      fileName = this.getFileNameFromHttpResponse(res);
      console.log("FIle Name " + fileName);
      var blob = new Blob([res.body]);
      saveAs(blob, fileName);
    });
  }
}
