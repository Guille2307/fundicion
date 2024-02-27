import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JobOffersService } from "src/app/shared/services/api/jobOffers/jobOffers.service";
import { PermissionsService } from "src/app/shared/services/permissions/permissions.service";

@Component({
  selector: "job-offers",
  templateUrl: "./jobOffers.component.html",
  styleUrls: ["./jobOffers.component.scss"],
})
export class JobOffersComponent implements OnInit {
  public query: any = "";

  selectedTab = "offers";

  sub = "";

  jobOffers = [];

  requests = [];

  constructor(
    private router: Router,
    public permissionsSvc: PermissionsService,
    private jobOffersService: JobOffersService
  ) {}

  async ngOnInit() {
    this.sub = this.permissionsSvc.getSub();
    if (this.sub === "PREMIUM") {
      this.selectedTab = "myOffers";
      this.jobOffers = await this.jobOffersService
        .getJobOffersByCompany()
        .then((result) => result.jobs);
      this.requests = await this.jobOffersService
        .getRequestsForCompany()
        .then((result) => result.Applicants);
    } else {
      this.jobOffers = await this.jobOffersService
        .getAllJobOffers()
        .then((result) => result.jobs);
    }
  }

  goToChat() {
    this.router.navigate(["/menu/chats"]);
  }

  segmentChanged(ev: any) {
    const value = ev.detail.value;
    this.selectedTab = value;
  }
}
