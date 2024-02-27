import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { ScheduleUserService } from "src/app/shared/services/api/scheduleUser/scheduleUser.service";
import { EventService } from "../../services/event/event.service";

@Component({
  selector: "activity-card",
  templateUrl: "./activityCard.component.html",
  styleUrls: ["./activityCard.component.scss"],
})
export class ActivityCardComponent implements OnInit {
  @Input() card?;
  @Input() showBell = false;
  @Input() editCard = false;

  @Output() cardDeleted = new EventEmitter<any>();

  constructor(
    private router: Router,
    private scheduleUserSvc: ScheduleUserService,
    private translateSvc: TranslateService,
    private alertCtrl: AlertController,
    public translateService: TranslateService,
    public eventSvc: EventService
  ) {}

  ngOnInit() {}

  activateNotifications(card) {
    card.assistance = !card.assistance;
    if (card.assistance) {
      this.scheduleUserSvc.addToSchedule(card.id).then((result) => {
        return result;
      });
    } else {
      this.scheduleUserSvc.deleteFromSchedule(card.id).then((result) => {
        return result;
      });
    }
  }

  async deleteCard(card) {
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
            handler: () => this.resolveFunction(card),
          },
          {
            text: "Cancel",
          },
        ],
      });

      await alert.present();
    }
  }

  async resolveFunction(card) {
    const cardDeleted = await this.eventSvc
      .deleteSchedule(card.id)
      .then((result) => {
        return card.id;
      });

    if (cardDeleted) {
      this.cardDeleted.emit(cardDeleted);
    }
  }

  duplicateCard(card) {
    sessionStorage.setItem("duplicateCard", JSON.stringify(card));
    this.router.navigate(["/menu/agenda/set-event"]);
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
      fullDate.getFullYear() +
      " - " +
      ("0" + fullDate.getHours()).slice(-2) +
      ":" +
      ("0" + fullDate.getMinutes()).slice(-2) +
      "h"
    );
  }

  async getDayName(day) {
    return await this.translateSvc
      .get("AGENDA.schedule." + day)
      .toPromise()
      .then((value) => {
        return value;
      });
  }

  showInfo() {
    if (this.editCard) {
      this.router.navigate(["/menu/agenda/edit-event", this.card.id]);
    } else {
      this.router.navigate(["/menu/info/activity", this.card.id]);
    }
  }

  getDay(date) {
    return new Date(date).getDate();
  }
}
