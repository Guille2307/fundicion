import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';
import { VideoUrlPipe } from '../../pipes/videoUrl/videoUrl.pipe';

@Component({
  selector: 'embed-video',
  templateUrl: './embedVideo.component.html',
  styleUrls: ['./embedVideo.component.scss'],
})
export class EmbedVideoComponent implements OnInit, OnChanges {

  @Input() socialmedia?;

  iframeHtml?;

  constructor(
    public embedService: EmbedVideoService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.socialmedia.currentValue) {
      if (this.socialmedia !== undefined) {
        this.getUrl();
      }
    }
  }

  getUrl() {
    const videoUrl = new VideoUrlPipe();
    const url = videoUrl.transform(this.socialmedia);
    if (url !== undefined) {
      if (url.trim() !== '') {
        this.iframeHtml = this.embedService.embed(url, {
          query: { portrait: 0, color: '000000' },
          attr: { width: '100%', height: 315 }
        });
      }
    }
  }

}
