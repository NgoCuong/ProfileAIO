import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-profileaio',
  templateUrl: './profileaio.component.html',
  styleUrls: ['./profileaio.component.css']
})
export class ProfileaioComponent implements OnInit {
  profiletypes = ['Dashe', 'AIO Plus'];
  address: string;
  toProfile: string;
  loading: Boolean = false;
  @ViewChild('downloadZipLink') private downloadZipLink: ElementRef;


  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  async submit() {
    this.loading = true;
    // const blob = await this.profileService.sendUrl(this.address, this.toProfile);
    const blog = await this.profileService.createxlsx(this.address);

    const blob = await this.profileService.createxlsx(this.address);
    // saveAs(blob, "faf.xlsx");
    const url = window.URL.createObjectURL(blob);
    const link = this.downloadZipLink.nativeElement;
    link.href = url;
    link.download = 'somefile.xlsx';
    link.click();
    this.loading = false;
    window.URL.revokeObjectURL(url);


  }


}
