import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SponsorsService } from 'src/app/shared/services/api/sponsors/sponsors.service';

@Component({
  selector: 'sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss'],
})
export class SponsorsComponent implements OnInit {

  public query: any = '';

  sponsors = [];

  constructor(
    private router: Router,
    private sponsorsService: SponsorsService
  ) { }

  ngOnInit() {
    this.getSponsors();
  }

  async getSponsors() {
    this.sponsors = await this.sponsorsService.getSponsors().then(result => {
      return result.Sponsors.sort((a, b) => {
        if (this.returnPos(a.type) < this.returnPos(b.type)) {
          return 1;
        }
        if (this.returnPos(a.type) > this.returnPos(b.type)) {
          return -1;
        }
        if (this.takeOffAccents(a.name.toUpperCase().trim()) > this.takeOffAccents(b.name.toUpperCase().trim())) {
          return 1;
        }
        if (this.takeOffAccents(a.name.toUpperCase().trim()) < this.takeOffAccents(b.name.toUpperCase().trim())) {
          return -1;
        }
        return 0;
      });
    }).catch((err) => {
      return null;
    });
  }

  returnPos(role) {
    switch (role) {
      case 'patrocinador':
        return 1;
      case 'patrocinador principal':
        return 2;
    }
  }

  takeOffAccents(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  separateType(record, recordIndex, records) {
    if (recordIndex === 0) {
      if (record.type !== undefined) {
        return record.type.toUpperCase();
      }
    }

    let firstPrev;
    if (records[recordIndex - 1] !== undefined) {
      firstPrev = records[recordIndex - 1].type;
    }
    const firstCurrent = record.type;

    if (firstPrev !== firstCurrent) {
      return firstCurrent.toUpperCase();
    }

    return null;
  }

  goToChat() {
    this.router.navigate(['/menu/chats']);
  }

  goToSponsorProfile(sponsor) {
    this.router.navigate(['/menu/sponsor', sponsor.id]);
  }
}
