import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { SendInscriptionComponent } from '../../pages/popovers/sendInscription/sendInscription.component';
import { CreateMeetingService } from '../../services/api/createMeeting/createMeeting.service';
import { JobOffersService } from '../../services/api/jobOffers/jobOffers.service';
import { PermissionsService } from '../../services/permissions/permissions.service';

@Component({
  selector: 'info-offer-for-assistant',
  templateUrl: './infoOfferForAssistant.component.html',
  styleUrls: ['./infoOfferForAssistant.component.scss'],
})
export class InfoOfferForAssistantComponent implements OnInit {

  sub = '';
  offer: any = {};

  offerRequested = false;

  constructor(
    public popoverController: PopoverController,
    public permissionsSvc: PermissionsService,
    private activatedRoute: ActivatedRoute,
    private jobOffersService: JobOffersService,
    private router: Router,
    private createMeeting: CreateMeetingService
  ) {
    this.activatedRoute.params.subscribe( params => this.getInfoOffer(params.id));
  }

  ngOnInit() {
    this.sub = this.permissionsSvc.getSub();
  }

  async getRequest() {
    const offers = await this.jobOffersService.getRequestsForUser().then((result) => {
      return result.jobsRegistration;
    });

    if (offers) {
      offers.forEach(offer => {
        if (offer.job_id === this.offer.id) {
          this.offerRequested = true;
        }
      });
    }
  }

  async openPopover(ev) {
    const popover = await this.popoverController.create({
      component: SendInscriptionComponent,
      cssClass: 'inscription-popover',
      // event: ev,
      componentProps: {
        offer: this.offer
      },
      translucent: true
    });
    return await popover.present();
  }

  async getInfoOffer(id) {
    const jobOffers = await this.jobOffersService.getAllJobOffers().then(result => result.jobs);

    if (jobOffers) {
      jobOffers.forEach(offer => {
        if (offer.id === id) {
          this.offer = offer;
          this.getRequest();
        }
      });
    }
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== 'null' && value.trim() !== '' && value !== 'undefined') {
        return true;
      }
    }
    return false;
  }

  async goToReviewRequest() {
    const meetings = await this.createMeeting.showMeetingForEmployee().then((result) => result.Meetings);
    if (meetings) {
      let meet: any = {};
      meetings.forEach(meeting => {
        if (this.offer.user_id === meeting.company_id) {
          meet = meeting;
        }
      });
      sessionStorage.setItem('infoMeeting', JSON.stringify(meet));
      this.router.navigate(['/menu/review-meet', meet.id]);
    }
  }
}
