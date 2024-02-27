import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { PopoverController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { lastValueFrom } from "rxjs";
import { MonthsComponent } from "src/app/shared/pages/popovers/months/months.component";
import { EventService } from "src/app/shared/services/event/event.service";
import { MobileService } from "src/app/shared/services/mobile/mobile.service";
import { ModulesService } from "src/app/shared/services/modules/modules.service";
import { PermissionsService } from "src/app/shared/services/permissions/permissions.service";

@Component({
  selector: "agenda",
  templateUrl: "./agenda.component.html",
  styleUrls: ["./agenda.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AgendaComponent implements OnInit, AfterViewChecked {
  daysTabs: any = [];

  currentTab? = null;

  dayStarts?;
  dayEnds?;

  selectedEvent?: any;

  schedule? = [];

  desktopView = true;

  public query: any = "";

  editAgenda = false;

  filter = "all";
  selectedMonth = "all";
  months = [];

  headerDay?;

  translations?;

  constructor(
    private cd: ChangeDetectorRef,
    private eventSvc: EventService,
    public mobileService: MobileService,
    public permissionsSvc: PermissionsService,
    private router: Router,
    private popoverCtrl: PopoverController,
    public translateService: TranslateService,
    public modulesSvc: ModulesService
  ) {
    this.desktopView = !this.mobileService.isMobile();
    this.getEventInfo();
    sessionStorage.removeItem("duplicateCard");
    this.getTranslations();
  }

  ngOnInit() {}

  async getTranslations() {
    this.translations = await lastValueFrom(
      this.translateService.get("AGENDA")
    ).then((res) => res);
  }

  ngAfterViewChecked(): void {
    const tabs = document.getElementsByClassName("segment-button") as any;
    const tabSelected = document.getElementById(this.currentTab);
    if (tabSelected !== null) {
      if (tabs) {
        for (let tab of tabs) {
          tab.classList.remove("segment-button-checked");
        }
      }
      tabSelected.classList.add("segment-button-checked");
    }
    this.cd.detectChanges();
  }

  newEvent() {
    this.router.navigate(["/menu/agenda/set-event"]);
  }

  segmentChanged(ev: any) {
    const value = ev.detail.value;
    this.currentTab = value;
    console.log("value", this.currentTab);
  }

  /**
   * Get info of the event
   */
  async getEventInfo() {
    this.selectedEvent = await this.eventSvc
      .showInfoEvent()
      .then((result) => result);
    if (this.selectedEvent) {
      this.schedule = this.selectedEvent.schedule;
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

      this.schedule.forEach((item) => {
        let daySchedule = new Date().getTime();
        const tSD = item.starts.split(/[- :]/);
        const dSD = new Date(
          tSD[0],
          tSD[1] - 1,
          tSD[2],
          tSD[3],
          tSD[4],
          tSD[5]
        );
        daySchedule = new Date(dSD).getTime();
        const day = ("0" + new Date(daySchedule).getDate()).slice(-2);
        this.daysTabs.forEach((child) => {
          if (child.day === day) {
            item.day = day;
          }
        });
      });
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
      let flag = true;
      this.daysTabs.forEach((day) => {
        if (flag) {
          if (day.fulldate.getFullYear() === new Date().getFullYear()) {
            if (
              day.fulldate.getDate() === new Date().getDate() &&
              day.fulldate.getMonth() === new Date().getMonth()
            ) {
              this.currentTab = day.fulldate;
              flag = false;
            } else {
              this.currentTab = this.daysTabs[0].fulldate;
            }
          } else {
            this.currentTab = this.daysTabs[0].fulldate;
          }
        }
      });

      this.schedule.forEach((item) => {
        let daySchedule = new Date().getTime();
        const tSD = item.starts.split(/[- :]/);
        const dSD = new Date(
          tSD[0],
          tSD[1] - 1,
          tSD[2],
          tSD[3],
          tSD[4],
          tSD[5]
        );
        daySchedule = new Date(dSD).getTime();
        const day = ("0" + new Date(daySchedule).getDate()).slice(-2);
        dayTabs.forEach((dayTab) => {
          if (dayTab.day === day) {
            item.day = day;
          }
        });
      });
    }

    this.schedule.forEach((item) => {
      this.months.push(this.getDate(item.starts));
    });
    this.months = Array.from(new Set(this.months));
  }

  separate(record, recordIndex, records) {
    let iosDate = new Date().getTime();
    const tSD = record.starts.split(/[- :]/);
    const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
    iosDate = new Date(dSD).getTime();

    if (recordIndex === 0) {
      if (record.starts !== undefined) {
        return new Date(iosDate).getMonth();
      }
    }

    let firstPrev;
    if (records[recordIndex - 1] !== undefined) {
      let iosDate2 = new Date().getTime();
      const tSD2 = records[recordIndex - 1].starts.split(/[- :]/);
      const dSD2 = new Date(
        tSD2[0],
        tSD2[1] - 1,
        tSD2[2],
        tSD2[3],
        tSD2[4],
        tSD2[5]
      );
      iosDate2 = new Date(dSD2).getTime();
      firstPrev = new Date(iosDate2).getMonth();
    }
    const firstCurrent = new Date(iosDate).getMonth();

    if (firstPrev !== firstCurrent) {
      return firstCurrent;
    }

    return null;
  }

  public getDate(date) {
    let iosDate = new Date().getTime();
    const tSD = date.split(/[- :]/);
    const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
    iosDate = new Date(dSD).getTime();
    return new Date(iosDate).getMonth();
  }

  conditionDay(date, day) {
    let iosDate = new Date().getTime();
    const tSD = date.split(/[- :]/);
    const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
    iosDate = new Date(dSD).getTime();
    if (
      new Date(iosDate).getDate() === new Date(day).getDate() &&
      new Date(iosDate).getMonth() === new Date(day).getMonth()
    ) {
      return true;
    }
    return false;
  }

  getDay(date) {
    return ("0" + new Date(date).getDate()).slice(-2);
  }

  async openMonthsPopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: MonthsComponent,
      event: ev,
      componentProps: {
        monthsArray: this.months,
        selected: this.selectedMonth,
      },
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data !== undefined) {
      this.selectedMonth = data.month;
      if (data.month === "all") {
        this.filter = data.month;
      } else {
        this.translateService
          .get("AGENDA.schedule.months." + data.month)
          .subscribe((res) => {
            this.filter = res;
          });
      }
    }
  }

  getCardDeleted(ev) {
    let pos = 0;
    this.schedule.forEach((schedule) => {
      if (schedule.id === ev) {
        this.schedule.splice(pos, 1);
      }
      pos++;
    });
    window.location.reload();
  }
  showHeader(starts, i) {
    const day = starts[5] + starts[6];
    if (day !== this.headerDay || i === 0) {
      this.headerDay = day;
      return true;
    }
    return false;
  }

  getHeader(item) {
    const date = item.starts;
    const day = date[5] + date[6];
    return parseInt(day) - 1;
  }

  receiveActionCard(ev) {
    if (ev.action) {
      this.router.navigate(["/menu/agenda/edit-event", ev.id]);
    } else {
      this.router.navigate(["/menu/info/activity", ev.id]);
    }
  }
}
