import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SponsorsService } from 'src/app/shared/services/api/sponsors/sponsors.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-sponsor-profile',
  templateUrl: './sponsorProfile.component.html',
  styleUrls: ['./sponsorProfile.component.scss'],
})
export class SponsorProfileComponent implements OnInit {

  selectedSponsor?: any = {};

  iframeHtml?;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private sponsorsService: SponsorsService,
    public embedService: EmbedVideoService,
    public sanitizer: DomSanitizer
  ) {
    this.activatedRoute.params.subscribe( params => this.getInfoSponsor(params.sponsor));
  }

  ngOnInit() {}

  getUrl() {
    if (this.selectedSponsor.video) {
      const url = this.selectedSponsor.video.trim();
      if (url !== '') {
        this.iframeHtml = this.embedService.embed(url, {
          query: { portrait: 0, color: '000000' },
          attr: { width: '100%', height: 315 }
        });
      }
    }
  }

  async getInfoSponsor(id) {
    const sponsors = await this.sponsorsService.getSponsors().then(result => result.Sponsors);

    if (sponsors) {
      sponsors.forEach(sponsor => {
        if (sponsor.id === id) {
          this.selectedSponsor = sponsor;
          this.getUrl();
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== 'null' && value.trim() !== '' && value !== 'undefined') {
        return true;
      }
    }
    return false;
  }

  setUrl(url) {
    let http = '';
    for (let i = 0; i < 7; i++) {
      http += url[i];
    }
    let https = '';
    for (let i = 0; i < 8; i++) {
      https += url[i];
    }
    if (http === 'http://' || https === 'https://') {
      return url;
    } else {
      return 'http://' + url;
    }
  }
}
