import { Component, Input, OnInit } from '@angular/core';
import { SpeakersService } from 'src/app/shared/services/api/speakers/speakers.service';

@Component({
  selector: 'artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {

  speakers?;

  @Input() query = '';

  constructor(
    private speakersSvc: SpeakersService
  ) {
    this.getSpeakers();
  }

  ngOnInit() {
  }

  /**
   * Get speakers
   */
  async getSpeakers() {
    this.speakers = await this.speakersSvc.getSpeakers().then(res => {
      return res['speakers'];
    });
  }
}
