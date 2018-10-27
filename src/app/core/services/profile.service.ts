import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ProfileForm } from '../../shared/models/profile-form';

@Injectable()
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  // TODO pull these from database later on
  public getBotList(): Observable<string[]> {
    return of(['Dashe', 'ANB Plus', 'Trip', 'Sneakercop']);
  }

  public downloadFile(data: ProfileForm): void {
    this.createProfile(data)
      .subscribe((res => {
        const fileName = this.getFileNameFromHttpResponse(res);
        const blob = new Blob([res.body]);
        saveAs(blob, fileName);
      }));
  }

  private createProfile(param: ProfileForm): Observable<HttpResponse<any>> {
    return this.httpClient.post('/api/profile/create/' + param.botName.replace(' ', ''),
      { url: param.address }, { observe: 'response', responseType: 'blob' });
  }

  private getFileNameFromHttpResponse(httpResponse): string {
    const contentDispositionHeader = httpResponse.headers.get('Content-Disposition');
    const result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }
}
