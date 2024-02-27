import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { AlertController, PopoverController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { CreateMeetingService } from "src/app/shared/services/api/createMeeting/createMeeting.service";
import { JobOffersService } from "src/app/shared/services/api/jobOffers/jobOffers.service";
import { SendFileService } from "src/app/shared/services/api/sendFile/sendFile.service";
import { AddFileComponent } from "../addFile/addFile.component";
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: "send-inscription",
  templateUrl: "./sendInscription.component.html",
  styleUrls: ["./sendInscription.component.scss"],
})
export class SendInscriptionComponent implements OnInit {
  caracteres = 0;

  textarea = "";

  files: any = [];
  profileFiles = [];
  fileSelector;

  @Input() offer?;

  selectedMeeting;

  constructor(
    public popoverController: PopoverController,
    public sendFileService: SendFileService,
    private jobOffersService: JobOffersService,
    private createMeetingService: CreateMeetingService,
    public alertController: AlertController,
    public translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getFilesForOffer();
    this.setFileSelector();
  }

  isButtonDisabled() {
    if (this.textarea.trim() === "") {
      return true;
    }
    return false;
  }

  getCaracteresTextarea() {
    this.caracteres = this.textarea.length;

    let value = this.caracteres + "";
    while (value.length < 4) {
      value = "0" + value;
    }
    return value;
  }

  setFileSelector() {
    this.fileSelector = document.getElementById("file-selector-no-profile");
    this.fileSelector.addEventListener("change", (event) => {
      const files: any = Array.from(event.target.files);
      files.forEach((file) => {
        this.sendFileService
          .uploadFile(file, "offer", this.offer.id)
          .then((result) => {
            console.log(result);
          });
      });
      this.getFilesForOffer();
    });
  }

  cancelButtonClick() {
    this.popoverController.dismiss();
  }

  async getFilesForOffer() {
    this.files = await this.sendFileService
      .getFilesByType(this.offer.id)
      .then((value) => value);
    this.profileFiles = await this.sendFileService
      .getFilesUser()
      .then((value) => value);
  }

  async openPopover(ev) {
    const popover = await this.popoverController.create({
      component: AddFileComponent,
      cssClass: "add-file-popover",
      // event: ev,
      componentProps: {
        idOfferJob: this.offer.id,
      },
      translucent: true,
    });
    popover.onDidDismiss().then(() => {
      this.getFilesForOffer();
    });
    return await popover.present();
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
    const index = array.indexOf(this.offer.id);
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

  addFile() {
    this.fileSelector.click();
  }

  async sendButtonClick() {
    this.files.forEach((file) => {
      const jobId = [];
      if (file.job_id !== null && file.job_id !== "null") {
        JSON.parse(file.job_id).forEach((id) => {
          jobId.push(id);
        });
      }
      jobId.push(this.offer.user_id);
      this.sendFileService
        .updateFile(file.id, file.type, jobId)
        .then((result) => {
          console.log(result.message);
        });
    });

    this.jobOffersService
      .setJobRequest(this.offer.id, this.textarea.trim())
      .then((result) => {
        // console.log(result);
        return result;
      })
      .then((res) => this.presentAlertSuccess())
      .catch((err) => console.log("ERROR", err));
    // TODO: "el código de abajo es para hacer una cita automaticamente luego de solicitar el empleo mirar luego en request-card ";
    // // console.log(this.files);
    // this.popoverController.dismiss();
    // const userAlreadyHasMeet = await this.userAlreadyHasMeet().then(
    //   (result) => result
    // );
    // if (userAlreadyHasMeet) {
    //   const popover = await this.popoverController.create({
    //     component: CalendarComponent,
    //     componentProps: {
    //       companyId: this.offer.user_id,
    //     },
    //     translucent: true,
    //     backdropDismiss: false,
    //     cssClass: "calendar-popover",
    //   });
    //   await popover.present();

    //   const { data } = await popover.onDidDismiss();
    //   if (data) {
    //     // const filesId = [];
    //     // this.files.forEach(file => {
    //     //   filesId.push(file.id);
    //     // });
    //     // console.log(filesId);

    //     this.files.forEach((file) => {
    //       const jobId = [];
    //       if (file.job_id !== null && file.job_id !== "null") {
    //         JSON.parse(file.job_id).forEach((id) => {
    //           jobId.push(id);
    //         });
    //       }
    //       jobId.push(this.offer.user_id);
    //       this.sendFileService
    //         .updateFile(file.id, file.type, jobId)
    //         .then((result) => {
    //           console.log(result.message);
    //         });
    //     });

    //     // console.log(data);
    //     this.jobOffersService
    //       .setJobRequest(this.offer.id, this.textarea.trim())
    //       .then((result) => {
    //         // console.log(result);
    //         this.createMeetingService
    //           .createMeet(
    //             this.offer.user_id,
    //             this.textarea.trim(),
    //             this.setDate(data),
    //             result.job_id
    //           )
    //           .then((res) => this.presentAlertSuccess())
    //           .catch((err) => console.log("ERROR", err));
    //       })
    //       .catch((err) => this.presentAlertError(err));
    //   }
    // } else {
    //   this.jobOffersService
    //     .setJobRequest(this.offer.id, this.textarea.trim())
    //     .then((result) => {
    //       // console.log(result);
    //       const arrayOffers: any = JSON.parse(this.selectedMeeting.offer);
    //       arrayOffers.push(result.job_id);
    //       this.createMeetingService
    //         .editOfferMeeting(
    //           this.selectedMeeting.id,
    //           JSON.stringify(arrayOffers)
    //         )
    //         .then((res) => this.presentAlertSuccess())
    //         .catch((err) => console.log("ERROR", err));
    //     })
    //     .catch((err) => this.presentAlertError(err));
    // }
  }

  setDate(data) {
    return data.date + " " + data.hour;
  }

  async userAlreadyHasMeet() {
    const meetings = await this.createMeetingService
      .showMeetingForEmployee()
      .then((result) => {
        return result.Meetings;
      });

    // TODO HACER OTRA FUNCIÓN PARA EDITAR EL CAMPO "OFFER" DEL MEET Y AÑADIR OTRO ID DE OFFER

    if (meetings) {
      let flag = true;
      meetings.forEach((meet) => {
        if (meet.company_id === this.offer.user_id) {
          this.selectedMeeting = meet;
          flag = false;
        }
      });
      return flag;
    }
  }

  async presentAlertSuccess() {
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

  async presentAlertError(errorType) {
    console.log(errorType);
    const title = await this.translateService
      .get("JOB_OFFERS.inscription.alert.error.title")
      .toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService
      .get("JOB_OFFERS.inscription.alert.error.message")
      .toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message: message + " <br>(" + errorType + ")",
        buttons: ["Ok"],
      });

      await alert.present();
    }
  }
}
