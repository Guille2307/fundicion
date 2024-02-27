import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {DOC_ORIENTATION, NgxImageCompressService} from 'ngx-image-compress';
import { Observable } from 'rxjs';

@Component({
  selector: 'cropper-img',
  templateUrl: './cropperImg.component.html',
  styleUrls: ['./cropperImg.component.scss'],
})
export class CropperImgComponent implements OnInit {

  base64String: any;
  croppedImage: any = '';

  imgSelector;

  imgResultAfterCompress:string;

  constructor(
    private popover: PopoverController,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit() {
    this.imgSelector = document.getElementById('img-selector');
    if (this.imgSelector !== null) {
      this.imgSelector.click()
    }
  }

  async compressFile(image) {
    return await this.imageCompress.compressFile(image, -2, 50, 50).then( result => result );
  }

  fileChangeEvent(event: any): void {
    const image = event.target.files[0];
    this.getBase64(URL.createObjectURL(image)).subscribe(
      base64 => {
        this.base64String = base64;
      }
    );
  }

  async imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imgResultAfterCompress = await this.compressFile(this.croppedImage).then(res => res);
  }

  getBase64(url: string) {
    return Observable.create(observer => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onload = () => {
        let reader: FileReader = new FileReader();
        reader.onloadend = () => {
          observer.next(reader.result);
          observer.complete();
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  cancelPopOver() {
    this.popover.dismiss();
  }

  closePopover() {
    this.popover.dismiss({
      base64String: this.imgResultAfterCompress
    });
  }
}
