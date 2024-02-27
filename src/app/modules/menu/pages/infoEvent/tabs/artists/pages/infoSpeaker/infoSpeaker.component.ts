import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpeakersService } from 'src/app/shared/services/api/speakers/speakers.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { PopoverController } from '@ionic/angular';
import { ImageFullScreenComponent } from 'src/app/shared/pages/popovers/imageFullScreen/imageFullScreen.component';
import { ImageSpeakerPipe } from 'src/app/shared/pipes/imageSpeaker/imageSpeaker.pipe';

@Component({
  selector: 'info-speaker',
  templateUrl: './infoSpeaker.component.html',
  styleUrls: ['./infoSpeaker.component.scss'],
})
export class InfoSpeakerComponent implements OnInit, AfterViewChecked {

  speaker?: any = {};

  iframeHtml?;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private speakersSvc: SpeakersService,
    public embedService: EmbedVideoService,
    public popoverController: PopoverController
  ) {
    this.activatedRoute.params.subscribe(params => this.getSpeakerInfo(params['speaker']));
  }

  ngOnInit() { }

  ngAfterViewChecked(): void {
    if (this.speaker) {
      this.setImagesSpeaker(this.speaker.id);
    }
  }

  setImagesSpeaker(id) {
    const imgSpeakerPipe = new ImageSpeakerPipe();
    const imgContainer = document.getElementById('img-container-speaker') as HTMLImageElement;
    if (imgContainer) {
      imgContainer.style.background = 'url("' + imgSpeakerPipe.transform(id) + '") no-repeat center center / cover';
    }
  }

  /**
   * Get info of the speaker
   */
  async getSpeakerInfo(id) {
    const speakers = await this.speakersSvc.getSpeakers()
      .then((result) => result['speakers']);

    if (speakers) {
      speakers.forEach(speaker => {
        if (speaker.id === id) {
          this.speaker = speaker;
          this.getUrl();
        }
      });
    }
  }

  async showImage(id) {
    const imgSpeakerPipe = new ImageSpeakerPipe();
    const src = imgSpeakerPipe.transform(id);
    const popover = await this.popoverController.create({
      component: ImageFullScreenComponent,
      componentProps: {
        src
      },
      cssClass: 'image-popover',
      translucent: true
    });
    return await popover.present();
  }

  largeName(name: string) {
    let newName = '';
    if (name.length >= 40) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < 40; i++) {
        newName += name[i];
      }
      newName += '...';
    } else {
      newName += name;
    }
    return newName;
  }

  getUrl() {
    if (this.speaker.video) {
      const url = this.speaker.video.trim();
      if (url !== '') {
        this.iframeHtml = this.embedService.embed(url, {
          query: { portrait: 0, color: '000000' },
          attr: { width: '100%', height: 315 }
        });
      }
    }
  }

  goBack() {
    this.location.back();
  }

}
