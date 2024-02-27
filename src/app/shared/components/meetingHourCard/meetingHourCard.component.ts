import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { ConfigAgendaComponent } from "../../pages/popovers/configAgenda/configAgenda.component";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "meeting-hour-card",
  templateUrl: "./meetingHourCard.component.html",
  styleUrls: ["./meetingHourCard.component.scss"],
})
export class MeetingHourCardComponent implements OnInit, AfterViewInit {
  @Input() meetings?;
  linkedMeet?;

  status = "available";

  @Input() hour: any;
  @Input() fulldate: any;
  day?: any;
  hourSelected?: any;

  getMeetings = true;

  @Output() actionMeeting = new EventEmitter<any>();

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.day =
      new Date(this.fulldate).getFullYear() +
      "-" +
      ("0" + (new Date(this.fulldate).getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date(this.fulldate).getDate()).slice(-2);
  }

  ngAfterViewInit(): void {
    this.getAvailabilityCard();
  }

  getAvailabilityCard() {
    if (this.meetings) {
      this.hourSelected = this.day + " " + this.hour + ":00";
      this.meetings.forEach((meet) => {
        if (meet.starts === this.hourSelected) {
          this.linkedMeet = meet;
          if (meet.status !== null) {
            this.status = "reserved";
          } else {
            this.status = "unavailable";
          }
        }
      });
    }
  }

  getEndHour(hour) {
    let hours = hour[0] + hour[1];
    let mins = hour[3] + hour[4];
    switch (mins) {
      case "00":
        mins = (parseInt(mins) + 30).toString();

        break;
      case "30":
        mins = "00";
        hours = (parseInt(hours) + 1).toString();
    }
    return hours + ":" + mins;
  }

  async showPopOver() {
    this.actionMeeting.emit(true);
    this.getAvailabilityCard();
    if (this.status !== "reserved") {
      const popover = await this.popoverController.create({
        component: ConfigAgendaComponent,
        componentProps: {
          meet: this.linkedMeet,
          status: this.status,
          date: this.day,
          hour: this.hour,
          endHour: this.getEndHour(this.hour),
        },
        cssClass: "config-agenda-popover",
        backdropDismiss: false,
        keyboardClose: true,
      });
      popover.present();
      const { data } = await popover.onDidDismiss();
      if (data) {
        this.status = data.status;
      }
    }
  }
}
