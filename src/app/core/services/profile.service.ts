import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { saveAs } from 'file-saver';


@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  public() {

    this.http.get('/api/public')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  private() {
    this.http.get('/api/private')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  async sendUrl(address: string, param): Promise<Blob> {
    var filename;
    const file = await this.http.post<Blob>('/profile/create/' + param.replace(" ", "").toLowerCase(), { url: address },
      {
        responseType: 'blob' as 'json'
      }).toPromise();
    return file;
  }

  getFileNameFromHttpResponse(httpResponse) {
    var contentDispositionHeader = httpResponse.headers.get('Content-Disposition');
    var result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }

  async downloadFile(address: string, param) {
    var fileName;
    await this.http.post<any>('/profile/create/' + param.replace(" ", "").toLowerCase(), { url: address }, {
      responseType: 'blob' as 'json',
      observe: 'response' as 'response'

    }).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      fileName = this.getFileNameFromHttpResponse(res);
      console.log("FIle Name " + fileName);
      var blob = new Blob([res.body]);
      saveAs(blob, fileName);
    });
  }
}
