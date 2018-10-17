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
    this.socket = io(SERVER_URL);
  }
  //   connect(): Rx.Subject<MessageEvent> {
  //   // If you aren't familiar with environment variables then
  //   // you can hard code `environment.ws_url` as `http://localhost:5000`
  //   this.socket = io(environment.ws_url);

  //   // We define our observable which will observe any incoming messages
  //   // from our socket.io server.
  //   let observable = new Observable(observer => {
  //       this.socket.on('message', (data) => {
  //         console.log("Received message from Websocket Server")
  //         observer.next(data);
  //       })
  //       return () => {
  //         this.socket.disconnect();
  //       }
  //   });
    
  //   // We define our Observer which will listen to messages
  //   // from our other components and send messages back to our
  //   // socket server whenever the `next()` method is called.
  //   let observer = {
  //       next: (data: Object) => {
  //           this.socket.emit('message', JSON.stringify(data));
  //       },
  //   };

  //   // we return our Rx.Subject which is a combination
  //   // of both an observer and observable.
  //   return Rx.Subject.create(observer, observable);
  // }

  async submit() {
    this.loading = true;
    console.log(this.toProfile);
    this.socket.on('message', (data: string) => {
      console.log("fdafsfs" + data);
      this.status = data
    }).subscribe(message => {
      this.status = message;
    });

    // const blob = await this.profileService.sendUrl(this.address, this.toProfile);
    // const blog = await this.profileService.createxlsx(this.address);
    // this.status = "Under working ";

    const blob = await this.profileService.sendUrl(this.address, this.toProfile);


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
