import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'speaker-card',
  templateUrl: './speakerCard.component.html',
  styleUrls: ['./speakerCard.component.scss'],
})
export class SpeakerCardComponent implements OnInit {

  @Input() card;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  getDate(date) {
    let fullDate = new Date();

    if (date !== undefined) {
      const tSD = date.split(/[- :]/);
      const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
      fullDate = new Date(dSD);
    }

    // const fullDate = new Date(date);
    // tslint:disable-next-line: max-line-length
    return ('0' + fullDate.getDate()).slice(-2) + '/' + ('0' + fullDate.getMonth()).slice(-2) + '/' + fullDate.getFullYear() + ' - ' + ('0' + fullDate.getHours()).slice(-2) + ':' + ('0' + fullDate.getMinutes()).slice(-2) + 'h';
  }

  showInfo() {
    if (this.card.profile) {
      this.router.navigate(['/menu/info/assistant', this.card.id]);
    } else {
      this.router.navigate(['/menu/info/speaker', this.card.id]);
    }
  }
}
