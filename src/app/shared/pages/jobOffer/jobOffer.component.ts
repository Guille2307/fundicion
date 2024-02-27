import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOffersService } from '../../services/api/jobOffers/jobOffers.service';
import { PermissionsService } from '../../services/permissions/permissions.service';

@Component({
  selector: 'job-offer',
  templateUrl: './jobOffer.component.html',
  styleUrls: ['./jobOffer.component.scss'],
})
export class JobOfferComponent implements OnInit {

  sub = 'EMPLOYEE';
  offerId?;

  showEditButton = false;

  constructor(
    private location: Location,
    public permissionsSvc: PermissionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jobOffersSvc: JobOffersService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.offerId = params['id'];
      this.jobOffersSvc.getJobOffersByCompany().then(res => {
        res.jobs.forEach(job => {
          if (job.id === this.offerId) {
            this.showEditButton = true;
          }
        });
      });
    });
  }

  ngOnInit() {
    this.sub = this.permissionsSvc.getSub();
  }

  goBack() {
    this.location.back();
  }

  editOffer() {
    this.router.navigate(['/menu/edit-job-offer/', this.offerId]);
  }
}
