import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { saveAs } from 'file-saver';
import { ProfileService } from '../../core/services/profile.service';

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
  @ViewChild('downloadZipLink') private downloadZipLink: ElementRef;


  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  async submit() {
    this.loading = true;
    console.log(this.toProfile);
    // const blob = await this.profileService.sendUrl(this.address, this.toProfile);
    // const blog = await this.profileService.createxlsx(this.address);

    const blob = await this.profileService.createxlsx(this.address, this.toProfile);
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
