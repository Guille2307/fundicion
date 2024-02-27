import { Location } from "@angular/common";
import { AfterViewChecked, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, PopoverController } from "@ionic/angular";
import { CalendarComponent } from "../../../../../../shared/pages/popovers/calendar/calendar.component";
import { SendFileService } from "src/app/shared/services/api/sendFile/sendFile.service";
import { AddFileComponent } from "src/app/shared/pages/popovers/addFile/addFile.component";
import { CreateMeetingService } from "src/app/shared/services/api/createMeeting/createMeeting.service";
import { ImageProfilePipe } from "src/app/shared/pipes/imageProfile/imageProfile.pipe";
import { AssistantsService } from "src/app/shared/services/api/assistants/assistants.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "request-meetings",
  templateUrl: "./requestMeeting.component.html",
  styleUrls: ["./requestMeeting.component.scss"],
})
export class RequestMeetingComponent implements OnInit, AfterViewChecked {
  public cont = 0;
  textRequest = "";

  textDate: any;
  textHour: any;
  fullDate: any;

  companyId;
  company;

  files: any = [];
  profileFiles = [];
  fileSelector;

  constructor(
    private router: Router,
    private location: Location,
    private popoverCtrl: PopoverController,
    private createMeetingService: CreateMeetingService,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private assistantsSvc: AssistantsService,
    public sendFileService: SendFileService,
    public translateService: TranslateService
  ) {
    this.activatedRoute.params.subscribe(async (params) => {
      this.companyId = params.idCompany;

      const assistants = await this.assistantsSvc
        .getAssistants()
        .then((result) => {
          return result.users;
        })
        .catch((err) => {
          return null;
        });

      if (assistants) {
        assistants.forEach((item) => {
          if (item.id === this.companyId) {
            this.company = item;
          }
        });
        this.setFileSelector();
      }
    });
  }

  ngOnInit() {
    this.getFilesForOffer();
  }

  ngAfterViewChecked(): void {
    const imgProfilePipe = new ImageProfilePipe();
    const imgContainer = document.getElementById("img-container");
    // imgContainer.style.background = 'url("' + imgProfilePipe.transform(this.companyId) + '") no-repeat center center / cover'; esta es la imagen de el div de el perfil
  }

  goBack() {
    this.location.back();
  }

  getCharsCount(event) {
    this.cont = event.detail.value.length;
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== "null" && value.trim() !== "" && value !== "undefined") {
        return true;
      }
    }
    return false;
  }

  setFileSelector() {
    this.fileSelector = document.getElementById("file-selector-no-profile");
    this.fileSelector.addEventListener("change", (event) => {
      const files: any = Array.from(event.target.files);
      files.forEach((file) => {
        this.sendFileService
          .uploadFile(file, "meet", this.companyId)
          .then((result) => {
            console.log(result);
          });
      });
      this.getFilesForOffer();
    });
  }

  async getFilesForOffer() {
    this.files = await this.sendFileService
      .getFilesByType(this.companyId)
      .then((value) => value);
    this.profileFiles = await this.sendFileService
      .getFilesUser()
      .then((value) => value);
  }

  addFile() {
    this.fileSelector.click();
  }

  setDocName(name) {
    let finalName = "";
    for (let i = 11; i < name.length; i++) {
      finalName += name[i];
    }
    return finalName;
  }

  deleteFile(file, i) {
    const array = JSON.parse(file.job_id);
    const index = array.indexOf(this.companyId);
    if (index > -1) {
      array.splice(index, 1);
    }
    this.sendFileService
      .removeFileFromJobId(file.id, file.type, array)
      .then((result) => {
        this.files.splice(i, 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async openPopOverFiles(ev) {
    const popover = await this.popoverCtrl.create({
      component: AddFileComponent,
      cssClass: "add-file-popover",
      // event: ev,
      componentProps: {
        idOfferJob: this.companyId,
      },
      translucent: true,
    });
    popover.onDidDismiss().then(() => {
      this.getFilesForOffer();
    });
    await popover.present();
  }

  async openPopover() {
    // console.log(this.companyId);
    const popover = await this.popoverCtrl.create({
      component: CalendarComponent,
      componentProps: {
        companyId: this.companyId,
      },
      translucent: true,
      backdropDismiss: false,
      cssClass: "calendar-popover",
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    this.setDate(data);
  }

  setDate(dateHour) {
    if (dateHour) {
      const newDate = new Date(dateHour.date);
      this.textDate =
        ("0" + newDate.getDate()).slice(-2) +
        "/" +
        ("0" + (newDate.getMonth() + 1)).slice(-2) +
        "/" +
        newDate.getFullYear();
      this.textHour = dateHour.hour.slice(0, 5);
      this.fullDate = dateHour.date + " " + dateHour.hour;
    }
  }

  acceptAndSend() {
    if (this.textRequest.trim() !== "" && this.fullDate !== undefined) {
      this.createMeetingService
        .createMeetWithouOffer(
          this.companyId,
          this.textRequest.trim(),
          this.fullDate
        )
        .then((result) => this.presentAlertSuccess())
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async presentAlertSuccess() {
    this.location.back();
    const title = await this.translateService
      .get("JOB_OFFERS.inscription.alert.success.title")
      .toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService
      .get("JOB_OFFERS.inscription.alert.success.message")
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

  goToProfile() {
    this.router.navigate(["menu/info/assistant/", this.companyId]);
  }
}
