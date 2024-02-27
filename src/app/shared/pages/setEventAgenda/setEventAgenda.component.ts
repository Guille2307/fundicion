import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AlertController, PopoverController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { ScheduleUserService } from "../../services/api/scheduleUser/scheduleUser.service";
import { CalendarComponent } from "../popovers/calendar/calendar.component";
import { SpeakersComponent } from "../popovers/speakers/speakers.component";
import { EventService } from "../../services/event/event.service";
import { CropperImgComponent } from "../popovers/cropperImg/cropperImg.component";
import { SendImageService } from "../../services/api/sendImage/sendImage.service";
import { ImageSchedulePipe } from "../../pipes/imageSchedule/imageSchedule.pipe";
import { SpeakersService } from "../../services/api/speakers/speakers.service";

@Component({
  selector: "set-event-agenda",
  templateUrl: "./setEventAgenda.component.html",
  styleUrls: ["./setEventAgenda.component.scss"],
})
export class SetEventAgendaComponent implements OnInit {
  editEventId?;

  public eventForm: FormGroup;

  showTooltip = false;

  imgProfile?;

  card?;

  speakers = [];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public alertCtrl: AlertController,
    public translateService: TranslateService,
    private scheduleUserSvc: ScheduleUserService,
    public popoverController: PopoverController,
    public eventSvc: EventService,
    public alertController: AlertController,
    public sendImageService: SendImageService,
    public speakersSvc: SpeakersService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.setForm();
      this.card = JSON.parse(sessionStorage.getItem("duplicateCard"));
      if (this.card) {
        this.getEventToEdit(this.card.id);
      } else if (params["id"] !== undefined) {
        this.getEventToEdit(params["id"]);
      }
    });
  }

  ngOnInit() {
    this.setTextareas();
    this.getSpeakers();
  }

  async getSpeakers() {
    this.speakers = await this.speakersSvc.getSpeakers().then((res) => {
      return res["speakers"];
    });
  }

  setImages(photo) {
    const imgSchedulePipe = new ImageSchedulePipe();
    const imgContainer = document.getElementById("img-container");
    if (imgContainer) {
      imgContainer.style.background =
        'url("' +
        imgSchedulePipe.transform(photo) +
        '") no-repeat center center / cover';
    }
  }

  setForm() {
    this.eventForm = this.fb.group({
      title: ["", [Validators.required]],
      speakers: [[], []],
      starts: ["", [Validators.required]],
      ends: ["", []],
      photo: ["", []],
      category: ["", []],
      location: ["", []],
      description: ["", []],
      iframe: ["", []],
      streaming: [false, []],
      url_venta: ["", []],
    });
  }

  async getEventToEdit(id) {
    if (!this.card) {
      this.editEventId = id;
    }
    const event = await this.scheduleUserSvc
      .getInfoSchedule(id)
      .then((result) => result["schedule"]);
    if (event) {
      this.setImages(event.photo);
      this.eventForm = this.fb.group({
        title: [event.title, [Validators.required]],
        speakers: [this.getScheduleSpeakers(event.speakers), []],
        starts: [event.starts, [Validators.required]],
        ends: [event.ends, []],
        photo: [event.photo, []],
        category: [event.category, []],
        location: [event.location, []],
        description: [event.description, []],
        iframe: [event.iframe, []],
        streaming: [JSON.parse(event.streaming), []],
        url_venta: [event.url_venta, []],
      });
    }
    console.log("Es", event.speakers);
  }

  getScheduleSpeakers(scheduleSpeakers) {
    const speakers = [];
    if (scheduleSpeakers !== undefined) {
      scheduleSpeakers.forEach((speaker) => {
        speakers.push({
          name: speaker.name,
          id: speaker.speaker_id,
        });
      });
    }
    return speakers;
  }

  setTextareas() {
    const textareaInfo = document.getElementById("textarea-info");
    textareaInfo.addEventListener("keydown", this.textareaAutosize);

    const textareaIframe = document.getElementById("textarea-iframe");
    textareaIframe.addEventListener("keydown", this.textareaAutosize);

    const infoContainer = document.getElementById("textarea-container-info");
    infoContainer.addEventListener("keydown", this.textareaAutosize);

    const iframeContainer = document.getElementById(
      "textarea-container-iframe"
    );
    iframeContainer.addEventListener("keydown", this.textareaAutosize);
  }

  textareaAutosize() {
    const el: any = this;
    setTimeout(() => {
      el.style.cssText = "height:auto; padding:0";
      el.style.cssText = "height:" + el.scrollHeight + "px";
    }, 0);
  }

  goBack() {
    sessionStorage.removeItem("duplicateCard");
    this.location.back();
  }

  /**
   * Checks if the form is valid
   */
  public isFormDisabled(): boolean {
    return this.eventForm.valid;
  }

  setEvent() {
    if (this.isFormDisabled()) {
      if (this.editEventId === undefined) {
        this.eventSvc
          .setSchedule(this.eventForm.value)
          .then((result) => this.setEventSuccess(result))
          .catch((err) => this.setEventError(err));
      } else {
        this.eventSvc
          .updateSchedule(this.eventForm.value, this.editEventId)
          .then((result) =>
            this.setEventUpdateSuccess(result, this.editEventId)
          )
          .catch((err) => this.setEventError(err));
      }
    } else {
      this.showTooltip = true;
    }
  }

  /**
   * Success on set event
   *
   * @param result
   */
  private setEventSuccess(result: any): void {
    if (result !== null) {
      if (this.eventForm.value.speakers !== null) {
        this.eventForm.value.speakers.forEach((speaker) => {
          this.speakersSvc
            .addSpeaker(speaker.id, result.schedule)
            .then((res) => console.log(res));
        });
      }

      this.setImgSchedule(result.schedule);
      this.presentAlertSuccess();
      this.location.back();
    } else {
      this.setEventError(result);
    }
  }

  /**
   * Success on set event
   *
   * @param result
   */
  private setEventUpdateSuccess(result: any, scheduleId): void {
    if (result !== null) {
      // this.speakersSvc.deleteSpeaker(result.schedule).then(res => console.log(res));
      if (this.eventForm.value.speakers !== null) {
        this.eventForm.value.speakers.forEach((speaker) => {
          this.speakersSvc
            .addSpeaker(speaker.id, scheduleId)
            .then((res) => console.log(res));
        });
      }
      this.setImgSchedule(scheduleId);
      this.presentAlertSuccess();
      this.location.back();
    } else {
      this.setEventError(result);
    }
  }

  async presentAlertSuccess() {
    let titleTraduc = "AGENDA.edit.setEvent.alert.success.title";
    let messageTraduc = "AGENDA.edit.setEvent.alert.success.message";
    if (this.editEventId !== undefined) {
      titleTraduc = "AGENDA.edit.alert.title";
      messageTraduc = "AGENDA.edit.alert.message";
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
      const alert = await this.alertCtrl.create({
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

  /**
   * Error on set event
   *
   * @param result
   */
  private setEventError(result: any): void {
    console.log("ERROR", result);
  }

  async deleteEvent() {
    const title = await this.translateService
      .get("AGENDA.edit.deleteCard.alert.title")
      .toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService
      .get("AGENDA.edit.deleteCard.alert.message")
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
            handler: () => this.resolveFunction(this.editEventId),
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
    this.eventSvc.deleteSchedule(id).then((result) => {
      this.location.back();
      window.location.reload();
    });
  }

  async openCalendarPopover() {
    const popover = await this.popoverController.create({
      component: CalendarComponent,
      componentProps: {
        companyId: null,
        setEvent: true,
      },
      translucent: true,
      backdropDismiss: false,
      cssClass: "calendar-popover",
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      this.eventForm.controls.starts.setValue(this.setDate(data));
    }
  }

  setDate(data) {
    return data.date + " " + data.hour + ":00";
  }

  async presentAlertImage(ev) {
    const title = await this.translateService
      .get("EDIT_PROFILE.alertImage.title")
      .toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService
      .get("EDIT_PROFILE.alertImage.message")
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
            handler: () => {
              this.goToCropperImg(ev);
            },
          },
        ],
      });

      await alert.present();
    }
  }

  async goToCropperImg(ev) {
    const popover = await this.popoverController.create({
      component: CropperImgComponent,
      cssClass: "cropper-img-popover",
      backdropDismiss: false,
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (data) {
      const base64String = data.base64String;
      const base64 = await fetch(
        "data:image/jpg;base64," +
          base64String.replace("data:", "").replace(/^.+,/, "")
      );
      const blob = await base64.blob();
      if (blob) {
        this.imgProfile = blob;
      }
      const imgContainer = document.getElementById("img-container");
      if (imgContainer) {
        imgContainer.style.background =
          'url("' + base64String + '") no-repeat center center / cover';
      }
    }
  }

  setImgSchedule(scheduleId) {
    if (this.imgProfile !== null && this.imgProfile !== undefined) {
      this.sendImageService
        .uploadSchedulePicture(scheduleId, this.imgProfile)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  compareWith(o1, o2) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }
}
