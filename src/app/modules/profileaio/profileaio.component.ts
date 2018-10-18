import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { saveAs } from 'file-saver';
import { ProfileService } from '../../core/services/profile.service';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';



const SERVER_URL = 'http://localhost:5000';


@Component({
  selector: 'app-profileaio',
  templateUrl: './profileaio.component.html',
  styleUrls: ['./profileaio.component.css']
})
export class ProfileaioComponent implements OnInit {
  profiletypes = ['Dashe', 'ANB Plus', 'Trip', 'Sneakercop'];
  address: string;
  toProfile: string;
  message: string;
  loading: Boolean = false;
  status: string;
  private socket;
  @ViewChild('downloadZipLink') private downloadZipLink: ElementRef;


  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    // this.socket = io(SERVER_URL);
    // this.socket.on('message', (data: string) => {
    //   console.log(data);
    //   this.status = data
    // });
  }

  async submit() {
    this.loading = true;
    const blob = await this.profileService.downloadFile(this.address, this.toProfile);
    this.loading = false;

    // this.status = " Done ";
    // saveAs(blob, "faf.xlsx");
    // const url = window.URL.createObjectURL(blob);
    // const link = this.downloadZipLink.nativeElement;
    // link.href = url;
    // link.download = 'somefile.xlsx';
    // link.click();
    // this.loading = false;
    // window.URL.revokeObjectURL(url);


  }  
}
