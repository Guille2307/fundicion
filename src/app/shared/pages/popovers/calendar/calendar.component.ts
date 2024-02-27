import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import * as moment from "moment";
import "moment/locale/es";
import { CreateMeetingService } from "src/app/shared/services/api/createMeeting/createMeeting.service";
import { EventService } from "src/app/shared/services/event/event.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  @Input() companyId: any;

  @Input() setEvent = false;

  date;
  year?;
  month?;

  public days = [];

  daysEvent = [];

  dateSelected: any;
  hourSelected: any;

  titleDateSelected: any;

  hours: any = [];

  meetings = [];

  time = "";

  constructor(
    private popover: PopoverController,
    private eventSvc: EventService,
    private createMeetingService: CreateMeetingService
  ) {}

  ngOnInit() {
    this.getEventInfo();
    if (this.companyId !== null) {
      this.getMeetings();
    }
  }

  setCalendar() {
    this.days = [];
    this.date = moment([this.year.toString(), this.month.toString()]).locale(
      "es"
    );
    this.createCalendar(this.date).forEach((day) => {
      // tslint:disable-next-line: max-line-length
      const fulldate =
        new Date(day).getFullYear() +
        "-" +
        ("0" + (new Date(day).getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + new Date(day).getDate()).slice(-2);
      if (day !== null) {
        this.days.push({
          day,
          fulldate,
          value: day.date(),
          hours: this.getHours(day.date()),
        });
      } else {
        this.days.push(null);
      }
    });
  }

  getHours(day) {
    let hours = [];
    if (!this.setEvent) {
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
      // if (day === 28) {
      //   // this.setHours('10:00', '19:00', 20, '14:00', '16:00');
      //   hours = [
      //     '18:00',
      //     '18:15',
      //     '18:30',
      //     '18:45',
      //     '19:00',
      //     '19:15',
      //     '19:30',
      //     '19:45',
      //     '20:00',
      //     '20:15',
      //     '20:30',
      //     '20:45'
      //   ];
      // } else if (day === 29) {
      //   hours = [
      //     '11:00',
      //     '11:15',
      //     '11:30',
      //     '11:45',
      //     '12:00',
      //     '12:15',
      //     '12:30',
      //     '12:45',
      //     '13:00',
      //     '13:15',
      //     '13:30',
      //     '13:45',
      //     '16:00',
      //     '16:15',
      //     '16:30',
      //     '16:45',
      //     '17:00',
      //     '17:15',
      //     '17:30',
      //     '17:45',
      //     '18:00',
      //     '18:15',
      //     '18:30',
      //     '18:45',
      //     '19:00',
      //     '19:15',
      //     '19:30',
      //     '19:45',
      //     '20:00',
      //     '20:15',
      //     '20:30',
      //     '20:45'
      //   ];
      // } else if (day === 30) {
      //   hours = [
      //     '11:00',
      //     '11:15',
      //     '11:30',
      //     '11:45',
      //     '12:00',
      //     '12:15',
      //     '12:30',
      //     '12:45',
      //     '13:00',
      //     '13:15',
      //     '13:30',
      //     '13:45',
      //     '16:00',
      //     '16:15',
      //     '16:30',
      //     '16:45',
      //     '17:00',
      //     '17:15',
      //     '17:30',
      //     '17:45',
      //     '18:00',
      //     '18:15',
      //     '18:30',
      //     '18:45',
      //     '19:00',
      //     '19:15',
      //     '19:30',
      //     '19:45',
      //     '20:00',
      //     '20:15',
      //     '20:30',
      //     '20:45'
      //   ];
      // }
    }
    return hours;
  }

  setHours(
    startMeetTime: string,
    endMeetTime: string,
    timeMeet = 15,
    startBreakTime: string = null,
    endBreakTime: string = null
  ) {
    const hours = [];
    let startHours = parseInt(startMeetTime[0] + startMeetTime[1]);
    let startMins = parseInt(startMeetTime[3] + startMeetTime[4]);
    let endHours = parseInt(endMeetTime[0] + endMeetTime[1]);
    let endMins = parseInt(endMeetTime[3] + endMeetTime[4]);

    let startBreakHours = parseInt(startBreakTime[0] + startBreakTime[1]);
    let startBreakMins = parseInt(startBreakTime[3] + startBreakTime[4]);
    let endBreakHours = parseInt(endBreakTime[0] + endBreakTime[1]) - 1;
    let endBreakMins = parseInt(endBreakTime[3] + endBreakTime[4]);

    // console.log(startHours + ':' + startMins);
    // console.log(endHours + ':' + endMins);
    // console.log(startBreakHours + ':' + startBreakMins);
    // console.log(endBreakHours + ':' + endBreakMins);

    console.log(60 / timeMeet);
    for (let i = startHours; i <= endHours; i++) {
      if (i !== startBreakHours && i !== endBreakHours) {
        if (i < startBreakHours || i > endBreakHours) {
          console.log(i);
          // switch (startMins) {
          //   case '00':
          //   case '15':
          //   case '30':
          //     startMins = (parseInt(startMins) + 15).toString();
          //     break;
          //   case '45':
          //     startMins = '00';
          //     startHours = (parseInt(startHours) + 1).toString();
          // }
        }
      }
    }

    console.log(hours);
  }

  createCalendar(month) {
    const firstDay = moment(month).startOf("M");
    const days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map((n) => {
        return moment(firstDay).add(n, "d");
      });

    for (let i = 0; i < firstDay.weekday(); i++) {
      days.unshift(null);
    }
    return days;
  }

  todayCheck(day) {
    return moment().format("L") === day.format("L");
  }

  disabledDay(fulldate) {
    let disabled = true;
    this.daysEvent.forEach((dayEvent) => {
      const date = dayEvent.year + "-" + dayEvent.month + "-" + dayEvent.day;
      if (date === fulldate) {
        disabled = false;
      }
    });
    return disabled;
  }

  selectedDate(day) {
    this.dateSelected = day.fulldate;
    this.titleDateSelected = day.day.format("DD MMMM");
    this.hourSelected = "";
    this.hours = day.hours;
  }

  async getMeetings() {
    this.meetings = await this.createMeetingService
      .getHoursForCompany(this.companyId)
      .then((result) => result.Meetings);
  }

  disabledHour(hour) {
    let disable = false;
    if (this.meetings) {
      if (this.meetings.length !== 0) {
        this.meetings.forEach((meet) => {
          if (meet.starts === this.dateSelected + " " + hour + ":00") {
            disable = true;
          }
        });
      }
    }
    return disable;
  }

  enableSubmitButton() {
    if ((this.dateSelected && this.hourSelected) || this.time.trim() !== "") {
      return false;
    }
    return true;
  }

  closePopover() {
    let hour = this.hourSelected;
    if (this.setEvent) {
      hour = this.time;
    }
    this.popover.dismiss({
      date: this.dateSelected,
      hour,
    });
  }

  cancelPopOver() {
    this.popover.dismiss();
  }

  async getEventInfo() {
    const selectedEvent = await this.eventSvc
      .showInfoEvent()
      .then((result) => result);
    if (selectedEvent) {
      this.getDays(selectedEvent.starts, selectedEvent.ends);
      this.setCalendar();
    }
  }

  getDays(dayStarts, dayEnds) {
    let startDate = new Date().getTime();
    let endDate = new Date().getTime();

    if (dayStarts !== undefined) {
      const tSD = dayStarts.split(/[- :]/);
      const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
      startDate = new Date(dSD).getTime();
    }

    if (dayEnds !== undefined) {
      const tED = dayEnds.split(/[- :]/);
      const dED = new Date(tED[0], tED[1] - 1, tED[2], tED[3], tED[4], tED[5]);
      endDate = new Date(dED).getTime();
    }

    if (
      new Date(startDate).getDate() === new Date(endDate).getDate() &&
      new Date(startDate).getMonth() === new Date(endDate).getMonth()
    ) {
      const dayTab = {
        year: new Date(startDate).getFullYear().toString(),
        month: ("0" + (new Date(startDate).getMonth() + 1)).slice(-2),
        day: ("0" + new Date(startDate).getDate()).slice(-2),
        weekday: new Date(startDate).getDay(),
        fulldate: new Date(startDate),
      };

      this.daysEvent.push(dayTab);
    } else {
      const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
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
          year: date.getFullYear().toString(),
          month: ("0" + (date.getMonth() + 1)).slice(-2),
          day: ("0" + date.getDate()).slice(-2),
          weekday: date.getDay(),
          fulldate: date,
        };
        dayTabs.push(dayTab);
      });

      this.daysEvent = dayTabs;
    }
    this.month = parseInt(this.daysEvent[0].month) - 1;
    this.year = parseInt(this.daysEvent[0].year);
  }

  previousYear() {
    this.dateSelected = null;
    this.year--;
    this.setCalendar();
  }

  nextYear() {
    this.dateSelected = null;
    this.year++;
    this.setCalendar();
  }

  previousMonth() {
    this.dateSelected = null;
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }
    this.setCalendar();
  }

  nextMonth() {
    this.dateSelected = null;
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
    this.setCalendar();
  }
}
