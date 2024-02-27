import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { JobOffersService } from '../../services/api/jobOffers/jobOffers.service';

@Component({
  selector: 'offer-card',
  templateUrl: './offerCard.component.html',
  styleUrls: ['./offerCard.component.scss'],
})
export class OfferCardComponent implements OnInit {

  @Input() offer: any;
  @Input() showArrow = true;

  requested = false;
  status = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    public translateService: TranslateService,
    private jobOffersService: JobOffersService
  ) { }

  ngOnInit() {
    this.getStatusOffer();
  }

  async getStatusOffer() {
    const offers = await this.jobOffersService.getRequestsForUser().then((result) => {
      return result.jobsRegistration;
    });

    if (offers) {
      offers.forEach(offer => {
        if (this.offer.id === offer.job_id) {
          this.requested = true;
          this.status = offer.status;
        }
      });
    }
  }

  showOffer(offer) {
    this.router.navigate(['/menu/job-offer/' + offer.id]);
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== 'null' && value.trim() !== '' && value !== 'undefined') {
        return true;
      }
    }
    return false;
  }

  async deleteOffer(offer) {
    const title = await this.translateService.get('JOB_OFFERS.deleteOffer.alert.title').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('JOB_OFFERS.deleteOffer.alert.message').toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertCtrl.create({
        header: title,
        message,
        buttons: [{
          text: 'Ok',
          handler: () => this.resolveFunction(offer.id)
        },
        {
          text: 'Cancel'
        }]
      });

      await alert.present();
    }
  }

  resolveFunction(id) {
    this.jobOffersService.deleteJobOffer(id).then((result) => {
      window.location.reload();
    });
  }
}
