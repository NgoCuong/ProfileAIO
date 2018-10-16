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
    var filename;
    const file = await this.http.post<Blob>('http://localhost:5000/profile/create/' + param.replace(" ", ""), { url : address}, 
      {
        responseType: 'blob' as 'json'
      }).toPromise();
      // var contentDispositionHeader = httpResponse.headers('Content-Disposition');

    // console.log

    return file;
  }

  getFileNameFromResponseContentDisposition(res){
    const contentDisposition = res.headers.get('content-disposition') || '';
    const matches = /filename=([^;]+)/ig.exec(contentDisposition);
    const fileName = (matches[1] || 'untitled').trim();
    return fileName;

  }
  async createxlsx(address: string, param){
    //   this.http.post("http://localhost/a2/pdf.php", JSON.stringify(model), {
    //     method: RequestMethod.Post,
    //     responseType: ResponseContentType.Blob,
    //     headers: new Headers({'Content-Type', 'application/x-www-form-urlencoded'})
    // }).subscribe(
    //     response => { // download file
    //         var blob = new Blob([response.blob()], {type: 'application/pdf'});
    //         var filename = 'file.pdf';
    //         saveAs(blob, filename);
    //     },
    //     error => {
    //         console.error(`Error: ${error.message}`);
    //     }
    // );
    var fileName;
    await this.http.post('http://localhost:5000/profile/create/' + param.replace(" ", ""), { url : address}, {
      responseType: 'blob' as 'json'
    }).subscribe((response: Response) => {
      // var blob = new Blob([response.blob()])
      console.log(response.headers);

      // fileName = this.getFileNameFromResponseContentDisposition(response);
    })

    console.log(fileName);
  }
}
