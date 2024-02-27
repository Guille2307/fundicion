import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JobOffersService } from "../../services/api/jobOffers/jobOffers.service";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from "@angular/router";
import jwt_decode from "jwt-decode";

@Component({
  selector: "set-job-offer",
  templateUrl: "./setJobOffer.component.html",
  styleUrls: ["./setJobOffer.component.scss"],
})
export class SetJobOfferComponent implements OnInit {
  editOfferId?;
  companyName?;

  public offerForm: FormGroup;

  showTooltip = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private jobOffersService: JobOffersService,
    public alertController: AlertController,
    public translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController
  ) {
    this.activatedRoute.params.subscribe((params) =>
      this.getOfferToEdit(params["id"])
    );
  }

  ngOnInit() {
    const textarea = document.querySelector("textarea");
    textarea.addEventListener("keydown", this.textareaAutosize);

    const infoContainer = document.getElementById("textarea-container");
    infoContainer.addEventListener("keydown", this.textareaAutosize);

    const name = jwt_decode(localStorage.getItem("selecteduserJWT"))["name"];
    const surnames = jwt_decode(localStorage.getItem("selecteduserJWT"))[
      "surnames"
    ];
    if (surnames === null) {
      this.companyName = name;
    } else {
      if (surnames.trim() === "null") {
        this.companyName = name + " " + surnames;
      }
    }

    this.offerForm = this.fb.group({
      title: ["", [Validators.required]],
      location: ["", [Validators.required]],
      sector: ["", [Validators.required]],
      vacancies: [, [Validators.required]],
      category: ["", []],
      contract: ["", [Validators.required]],
      level: ["", []],
      schedule: ["", [Validators.required]],
      salary: ["", []],
      experience: ["", []],
      studies: ["", []],
      requirements: ["", [Validators.required]],
      description: ["", [Validators.required]],
      company: ["", [Validators.required]],
    });
  }

  async getOfferToEdit(id) {
    this.editOfferId = id;
    const jobOffers = await this.jobOffersService
      .getJobOffersByCompany()
      .then((result) => result.jobs);
    if (jobOffers) {
      jobOffers.forEach((offer) => {
        if (offer.id === id) {
          this.offerForm = this.fb.group({
            title: [offer.title, [Validators.required]],
            location: [offer.location, [Validators.required]],
            sector: [offer.sector, [Validators.required]],
            vacancies: [offer.vacancies, [Validators.required]],
            category: [offer.category, []],
            contract: [offer.contract, [Validators.required]],
            level: [offer.level, []],
            schedule: [offer.schedule, [Validators.required]],
            salary: [offer.salary, []],
            experience: [offer.experience, []],
            studies: [offer.studies, []],
            requirements: [offer.requirements, [Validators.required]],
            description: [offer.description, [Validators.required]],
            company: [offer.company, [Validators.required]],
          });
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }

  textareaAutosize() {
    const el: any = this;
    setTimeout(() => {
      el.style.cssText = "height:auto; padding:0";
      el.style.cssText = "height:" + el.scrollHeight + "px";
    }, 0);
  }

  /**
   * Checks if the form is valid
   */
  public isFormDisabled(): boolean {
    return this.offerForm.valid;
  }

  setOffer() {
    if (this.isFormDisabled()) {
      if (this.editOfferId === undefined) {
        this.jobOffersService
          .setJobOffer(this.offerForm.value)
          .then((result) => this.setOfferSuccess(result))
          .catch((err) => this.setOfferError(err));
      } else {
        this.jobOffersService
          .updateJobOffer(this.offerForm.value, this.editOfferId)
          .then((result) => this.setOfferSuccess(result))
          .catch((err) => this.setOfferError(err));
      }
    } else {
      this.showTooltip = true;
    }
  }

  /**
   * Success on set offer
   *
   * @param result
   */
  private setOfferSuccess(result: any): void {
    if (result !== null) {
      this.presentAlertSuccess();
      this.location.back();
    } else {
      this.setOfferError(result);
    }
  }

  /**
   * Error on set offer
   *
   * @param result
   */
  private setOfferError(result: any): void {
    console.log("ERROR", result);
  }

  async presentAlertSuccess() {
    let titleTraduc = "JOB_OFFERS.setOffer.alert.success.title";
    let messageTraduc = "JOB_OFFERS.setOffer.alert.success.message";
    if (this.editOfferId !== undefined) {
      titleTraduc = "JOB_OFFERS.editOffer.alert.title";
      messageTraduc = "JOB_OFFERS.editOffer.alert.message";
    }
    const title = await this.translateService
      .get(titleTraduc)
      .toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService
      .get(messageTraduc)
      .toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message,
        buttons: [
          {
            text: "Ok",
            handler: () => window.location.reload(),
          },
        ],
      });

      await alert.present();
    }
  }

  async deleteOffer() {
    const title = await this.translateService
      .get("JOB_OFFERS.deleteOffer.alert.title")
      .toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService
      .get("JOB_OFFERS.deleteOffer.alert.message")
      .toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertCtrl.create({
        header: title,
        message,
        buttons: [
          {
            text: "Ok",
            handler: () => this.resolveFunction(this.editOfferId),
          },
          {
            text: "Cancel",
          },
        ],
      });

      await alert.present();
    }
  }

  resolveFunction(id) {
    this.jobOffersService.deleteJobOffer(id).then((result) => {
      console.log(result);
    });
  }
}
