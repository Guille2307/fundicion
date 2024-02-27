import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ImageGalleryPipe } from 'src/app/shared/pipes/imageGallery/imageGallery.pipe';

@Component({
  selector: 'image-full-screen',
  templateUrl: './imageFullScreen.component.html',
  styleUrls: ['./imageFullScreen.component.scss'],
})
export class ImageFullScreenComponent implements OnInit {

  @Input() src;

  constructor(
    public popoverController: PopoverController
  ) { }

  ngOnInit() { }

  closePopover() {
    this.popoverController.dismiss();
  }

}
