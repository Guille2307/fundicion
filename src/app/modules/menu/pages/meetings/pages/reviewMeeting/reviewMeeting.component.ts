import { Component, OnInit, AfterViewChecked, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { SendFileService } from "src/app/shared/services/api/sendFile/sendFile.service";
import {
  ModalController,
  PopoverController,
  ToastController,
} from "@ionic/angular";
import { ShowProfileUserService } from "src/app/shared/services/api/showProfileUser/showProfileUser.service";
import jwt_decode from "jwt-decode";
import { ImageProfilePipe } from "src/app/shared/pipes/imageProfile/imageProfile.pipe";
import { CalendarComponent } from "../../../../../../shared/pages/popovers/calendar/calendar.component";
import { AssistantsService } from "src/app/shared/services/api/assistants/assistants.service";
import { JobOffersService } from "src/app/shared/services/api/jobOffers/jobOffers.service";
import { AnnotationsService } from "src/app/shared/services/api/annotations/annotations.service";
import { TranslateService } from "@ngx-translate/core";
import { LoadingService } from "src/app/shared/services/loading/loading.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "review-meet",
  templateUrl: "./reviewMeeting.component.html",
  styleUrls: ["./reviewMeeting.component.scss"],
})
export class ReviewMeetComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  typeSub = jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"];

  timeLeft?;
  enterMeeting = false;

  offer: any;
  offers = [];

  annotations = "";
  arrayAnnotations = [];

  infoMeeting;
  meetingId?;
  meetingStatus?;
  meetingPresentation?;
  meetingStarts?;
  addCeroToLeft;

  selectedAssistant?;
  selectedCompany?;

  infoUser?;

  fileNames = [];

  intervalStart;
  intervalEnd;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private sendFileSvc: SendFileService,
    private popoverCtrl: PopoverController,
    private assistantsSvc: AssistantsService,
    private jobOffersService: JobOffersService,
    private annotationsService: AnnotationsService,
    public translateService: TranslateService,
    private toastCtrl: ToastController,
    public loadingSvc: LoadingService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.meetingId = params.id;
    });
  }

  ngOnInit() {
    // this.loadingSvc.presentLoading();
    this.getMeetingInfo();
  }

  ngOnDestroy() {
    sessionStorage.removeItem("infoMeeting");
  }

  async getMeetingInfo() {
    this.infoMeeting = JSON.parse(sessionStorage.getItem("infoMeeting"));
    this.getOfferInfo(this.infoMeeting.offer);
    // this.getAnnotations();

    const assistants = await this.assistantsSvc
      .getAssistants()
      .then((result) => {
        return result.users;
      })
      .catch((err) => {
        return null;
      });
    if (assistants) {
      assistants.forEach((assistant) => {
        if (this.infoMeeting.user_id === assistant.id) {
          this.selectedAssistant = assistant;
        }
        if (this.infoMeeting.company_id === assistant.id) {
          this.selectedCompany = assistant;
        }
      });
      if (
        jwt_decode(localStorage.getItem("selecteduserJWT"))["id"] ===
        this.selectedAssistant.id
      ) {
        this.infoUser = this.selectedCompany;
      } else {
        this.infoUser = this.selectedAssistant;
      }

      this.getFilesUser();
    }

    this.addCeroToLeft = (n) => "00".substring(0, "00".length - n.length) + n;
    this.meetingStarts = this.infoMeeting.starts;
    this.meetingPresentation = this.infoMeeting.presentation.replace(
      /<br\s*[\/]?>/gi,
      "\n"
    );
    this.meetingStatus = this.infoMeeting.status;
    if (this.meetingStatus === "Approved") {
      this.setTimerButton();
      // this.loadingSvc.loadingDismiss();
    }
  }

  async getOfferInfo(offersId) {
    let offers = [];
    if (offersId.trim() !== "") {
      offers = JSON.parse(offersId);
    }
    const jobIds = [];
    if (offers.length !== 0) {
      if (this.typeSub === "EMPLOYEE") {
        const requests = await this.jobOffersService
          .getRequestsForUser()
          .then((result) => result.jobsRegistration);
        if (requests) {
          requests.forEach((request) => {
            offers.forEach((offer) => {
              if (request.id === offer) {
                jobIds.push(request.job_id);
              }
            });
          });
        }
      } else {
        const requests = await this.jobOffersService
          .getRequestsForCompany()
          .then((result) => result.Applicants);
        if (requests) {
          requests.forEach((request) => {
            offers.forEach((offer) => {
              if (request.id_jobRegistration === offer) {
                jobIds.push(request.job_id);
              }
            });
          });
        }
      }
      if (jobIds.length !== 0) {
        const jobOffers = await this.jobOffersService
          .getAllJobOffers()
          .then((result) => result.jobs);
        if (jobOffers) {
          jobOffers.forEach((jobOffer) => {
            jobIds.forEach((jobId) => {
              if (jobOffer.id === jobId) {
                this.offers.push(jobOffer);
              }
            });
          });
        }
      }
    }
  }

  setTimerButton() {
    let iosDate = new Date().getTime();
    const tSD = this.meetingStarts.split(/[- :]/);
    const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
    iosDate = new Date(dSD).getTime();

    const end = new Date(iosDate);
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    this.intervalStart = setInterval(() => {
      const now = new Date();
      const distance = end.getTime() - now.getTime();
      if (distance < 0) {
        clearInterval(this.intervalStart);
        this.enterMeeting = true;
        this.startNewIntervalNoMeet();
        return;
      }
      const days = this.addCeroToLeft(Math.floor(distance / day) + "");
      const hours = this.addCeroToLeft(
        Math.floor((distance % day) / hour) + ""
      );
      const minutes = this.addCeroToLeft(
        Math.floor((distance % hour) / minute) + ""
      );
      const seconds = this.addCeroToLeft(
        Math.floor((distance % minute) / second) + ""
      );

      this.timeLeft = days + ":" + hours + ":" + minutes + ":" + seconds;
    }, 1000);
  }

  startNewIntervalNoMeet() {
    let date0 = new Date("2020-01-01 00:15"); // RESTO SIMPLEMENTE 15 MINUTOS DESDE QUE LA PERSONA ENTRA.
    this.intervalEnd = setInterval(() => {
      const minutes0 = this.addCeroToLeft(date0.getMinutes() + "");
      const seconds0 = this.addCeroToLeft(date0.getSeconds() + "");
      date0 = new Date(date0.getTime() - 1000);
      // this.stateMeet = '00' + ':' + minutes0 + ':' + seconds0;
      if (minutes0 === "00" && seconds0 === "00") {
        clearInterval(this.intervalEnd);
        this.enterMeeting = false;
      }
    }, 1000);
  }

  ngAfterViewChecked(): void {
    const imgProfilePipe = new ImageProfilePipe();
    const imgContainer = document.getElementById("img-container");
    if (this.infoUser !== undefined) {
      imgContainer.style.background =
        'url("' +
        imgProfilePipe.transform(this.infoUser.id) +
        '") no-repeat center center / cover';
    }
  }

  goToProfile() {
    this.router.navigate(["menu/info/assistant/", this.infoUser.id]);
  }

  setDocName(name) {
    let finalName = "";
    for (let i = 11; i < name.length; i++) {
      finalName += name[i];
    }
    return finalName;
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== "null" && value.trim() !== "" && value !== "undefined") {
        return true;
      }
    }
    return false;
  }

  async getFilesUser() {
    if (this.typeSub === "EMPLOYEE") {
      this.fileNames = await this.sendFileSvc
        .getFilesByType(this.infoUser.id)
        .then((result) => {
          return result;
        });
    } else {
      this.fileNames = await this.sendFileSvc
        .getFilesMeetCompanyByType(
          jwt_decode(localStorage.getItem("selecteduserJWT"))["id"],
          this.infoUser.id
        )
        .then((result) => {
          return result;
        });
    }
  }

  async openPopOverCalendar() {
    const popover = await this.popoverCtrl.create({
      component: CalendarComponent,
      translucent: true,
      backdropDismiss: false,
      cssClass: "calendar-popover",
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
  }

  getDate(date) {
    let fullDate = new Date();

    if (date !== undefined) {
      const tSD = date.split(/[- :]/);
      const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
      fullDate = new Date(dSD);
    }

    // tslint:disable-next-line: max-line-length
    return (
      ("0" + fullDate.getDate()).slice(-2) +
      "/" +
      ("0" + (fullDate.getMonth() + 1)).slice(-2) +
      "/" +
      fullDate.getFullYear()
    );
  }

  getTime(date) {
    let fullDate = new Date();

    if (date !== undefined) {
      const tSD = date.split(/[- :]/);
      const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
      fullDate = new Date(dSD);
    }

    // tslint:disable-next-line: max-line-length
    return (
      ("0" + fullDate.getHours()).slice(-2) +
      ":" +
      ("0" + fullDate.getMinutes()).slice(-2)
    );
  }

  enterMeet() {
    if (this.enterMeeting) {
      this.router.navigate(["/menu/meeting", this.infoMeeting.id]);
      this.goToChatDesktop();
      sessionStorage.setItem("infoMeeting", JSON.stringify(this.infoMeeting));
    }
  }

  goBack() {
    sessionStorage.removeItem("infoMeeting");
    this.location.back();
  }

  goToChatMobile() {
    sessionStorage.setItem("idAssistant", this.infoUser.id);
    sessionStorage.setItem(
      "name",
      this.infoUser.name + " " + this.infoUser.surnames
    );
    this.router.navigate(["/menu/chats"]);
  }

  goToChatDesktop() {
    sessionStorage.setItem("idAssistant", this.infoUser.id);
    sessionStorage.setItem(
      "name",
      this.infoUser.name + " " + this.infoUser.surnames
    );
    window.location.reload();
  }

  async getAnnotations() {
    this.arrayAnnotations = await this.annotationsService
      .getAnnotation(this.infoMeeting.user_id)
      .then((result) => result.Annotations);
    if (this.arrayAnnotations.length !== 0) {
      this.annotations = this.arrayAnnotations[0].annotation;
    }
  }

  saveAnnotation() {
    if (this.arrayAnnotations.length === 0) {
      this.annotationsService
        .setAnnotation(this.infoMeeting.user_id, this.annotations)
        .then((result) => {
          this.presentToast();
          return result;
        });
    } else {
      const annotationId = this.arrayAnnotations[0].id;
      this.annotationsService
        .updateAnnotation(annotationId, this.annotations)
        .then((result) => {
          this.presentToast();
          return result;
        });
    }
  }

  async presentToast() {
    const message = await this.translateService
      .get("MEETINGS.startMeeting.tabs.annotations.toast")
      .toPromise()
      .then((res) => {
        return res;
      });
    if (message) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });
      toast.present();
    }
  }
}
