import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Location } from "@angular/common";
import { CreateMeetingService } from "src/app/shared/services/api/createMeeting/createMeeting.service";
import { EventService } from "src/app/shared/services/event/event.service";
import { MobileService } from "src/app/shared/services/mobile/mobile.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "set-up-meeting-hours",
  templateUrl: "./setUpMeetingHours.component.html",
  styleUrls: ["./setUpMeetingHours.component.scss"],
})
export class SetUpMeetingHoursComponent implements OnInit, AfterViewChecked {
  // DATA MEET
  dataMeeting? = [];

  dateFormat;
  hourAndMinute;

  // DATA FROM POPOVER
  newStateDisp: boolean;
  newStateNoDisp: boolean;
  isDisponible: boolean;
  isNoDisponible: boolean;

  nameNewStateDisp: string;
  nameNewStateNoDisp: string;

  daysTabs: any = [];

  currentTab? = null;
  dayStarts?;
  dayEnds?;
  selectedEvent?: any = {};
  desktopView = true;
  public query: any = "";

  hours: any = [];

  constructor(
    private location: Location,
    private cd: ChangeDetectorRef,
    private eventSvc: EventService,
    public mobileService: MobileService,
    private createMeetingService: CreateMeetingService
  ) {
    this.getEventInfo();
    this.getPetitionsMeetEmployees();
    this.desktopView = !this.mobileService.isMobile();
  }

  ngOnInit() {}

  public getHours(day) {
    let hours = [];
    hours = [
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
    ];
    return hours;
  }

  goBack() {
    this.location.back();
  }

  async getPetitionsMeetEmployees() {
    this.dataMeeting = await this.createMeetingService
      .showMeetingForCompany()
      .then((result) => result.Meetings);
  }

  ngAfterViewChecked(): void {
    const tabs = document.getElementsByClassName("segment-button") as any;
    const tabSlected = document.getElementById(this.currentTab);
    if (tabSlected !== null) {
      if (tabs) {
        for (const tab of tabs) {
          tab.classList.remove("segment-button-checked");
        }
      }
      tabSlected.classList.add("segment-button-checked");
    }
    this.cd.detectChanges();
  }

  segmentChanged(ev: any) {
    this.getPetitionsMeetEmployees();
    const value = ev.detail.value;
    // console.log(value);
    this.currentTab = value;
  }

  /**
   * Get info of the event
   */
  async getEventInfo() {
    this.selectedEvent = await this.eventSvc
      .showInfoEvent()
      .then((result) => result);
    if (this.selectedEvent) {
      this.dayStarts = this.selectedEvent.starts;
      this.dayEnds = this.selectedEvent.ends;
      this.getDays();
    }
  }

  getDays(/*startDate: Date, endDate: Date*/) {
    let startDate = new Date().getTime();
    let endDate = new Date().getTime();

    if (this.dayStarts !== undefined) {
      const tSD = this.dayStarts.split(/[- :]/);
      const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
      startDate = new Date(dSD).getTime();
    }

    if (this.dayEnds !== undefined) {
      const tED = this.dayEnds.split(/[- :]/);
      const dED = new Date(tED[0], tED[1] - 1, tED[2], tED[3], tED[4], tED[5]);
      endDate = new Date(dED).getTime();
    }

    if (
      new Date(startDate).getDate() === new Date(endDate).getDate() &&
      new Date(startDate).getMonth() === new Date(endDate).getMonth()
    ) {
      const dayTab = {
        year: new Date(startDate).getFullYear(),
        month: new Date(startDate).getMonth(),
        day: ("0" + new Date(startDate).getDate()).slice(-2),
        weekday: new Date(startDate).getDay(),
        fulldate: new Date(startDate),
      };

      this.daysTabs.push(dayTab);
      this.currentTab = this.daysTabs[0].fulldate;
    } else {
      const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
      // const startDate = new Date(this.dayStarts).getTime();
      // const endDate = new Date(this.dayEnds).getTime();
      const daysBetweenDates: number = Math.ceil(
        (endDate - startDate) / MS_PER_DAY
      );
      const dates: Date[] = Array.from(
        new Array(daysBetweenDates + 1),
        (v, i) => new Date(startDate + i * MS_PER_DAY)
      );

      const dayTabs = [];
      dates.forEach((date) => {
        const dayTab = {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: ("0" + date.getDate()).slice(-2),
          weekday: date.getDay(),
          fulldate: date,
        };
        dayTabs.push(dayTab);
      });

      this.daysTabs = dayTabs;
      this.currentTab = this.daysTabs[0].fulldate;
    }
    // console.log(this.schedule);
  }

  getDay(date) {
    return ("0" + new Date(date).getDate()).slice(-2);
  }

  selectedDiv(date) {
    if (new Date(date).getDay() === new Date(this.currentTab).getDay()) {
      return true;
    }
    return false;
  }
}
