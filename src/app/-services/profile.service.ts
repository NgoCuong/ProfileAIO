import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {

  constructor() { }

  sendUrl(address: string) {
    console.log(address);

  }

}
