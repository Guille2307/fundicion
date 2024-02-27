import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import jwt_decode from "jwt-decode";
import { CreateMeetingService } from "src/app/shared/services/api/createMeeting/createMeeting.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "meetings",
  templateUrl: "./meetings.component.html",
  styleUrls: ["./meetings.component.scss"],
})
export class MeetingsComponent implements OnInit {
  typeSub = jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"];
  public query: any = "";

  meetings = [];

  constructor(
    private router: Router,
    private createMeetingService: CreateMeetingService
  ) {}

  ngOnInit() {
    if (this.typeSub === "EMPLOYEE") {
      this.getEmployeeMeetings();
    } else {
      this.getCompanyMeetings();
    }
  }

  async getEmployeeMeetings() {
    const meetings = await this.createMeetingService
      .showMeetingForEmployee()
      .then((result) => result.Meetings);
    if (meetings) {
      this.meetings = meetings.sort((a, b) => {
        const date1 = new Date(a.starts).getTime();
        const date2 = new Date(b.starts).getTime();
        if (this.returnStatus(a.starts) < this.returnStatus(b.starts)) {
          return 1;
        }
        if (this.returnStatus(a.starts) > this.returnStatus(b.starts)) {
          return -1;
        }
        if (date1 > date2) {
          return 1;
        }
        if (date1 < date2) {
          return -1;
        }
        return 0;
      });
    }
  }

  returnStatus(status) {
    switch (status) {
      case "Declined":
        return 1;
      case "Celebrated":
        return 2;
      case "Approved":
        return 3;
    }
  }

  async getCompanyMeetings() {
    const meetings = await this.createMeetingService
      .showMeetingForCompany()
      .then((result) => result.Meetings);
    if (meetings) {
      const meets = [];
      meetings.forEach((meet) => {
        if (meet.status !== null) {
          meets.push(meet);
        }
      });

      this.meetings = meets.sort((b, a) => {
        const date1 = new Date(a.starts).getTime();
        const date2 = new Date(b.starts).getTime();
        if (this.returnStatus(a.starts) < this.returnStatus(b.starts)) {
          return 1;
        }
        if (this.returnStatus(a.starts) > this.returnStatus(b.starts)) {
          return -1;
        }
        if (date1 < date2) {
          return 1;
        }
        if (date1 > date2) {
          return -1;
        }
        return 0;
      });
    }
  }

  takeOffAccents(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  separateLetter(record, recordIndex, records) {
    if (recordIndex === 0) {
      if (record.name[0] !== undefined) {
        return this.takeOffAccents(record.name[0].toUpperCase());
      }
    }

    let firstPrev;
    if (records[recordIndex - 1] !== undefined) {
      firstPrev = this.takeOffAccents(
        records[recordIndex - 1].name[0].toUpperCase()
      );
    }
    const firstCurrent = this.takeOffAccents(record.name[0].toUpperCase());

    if (firstPrev !== firstCurrent) {
      return firstCurrent.toUpperCase();
    }

    return null;
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== "null" && value.trim() !== "" && value !== "undefined") {
        return true;
      }
    }
    return false;
  }

  goToChat() {
    this.router.navigate(["/menu/chats"]);
  }

  goProfile() {
    this.router.navigate(["/menu/profile/my-info"]);
  }

  goToRequestMeeting() {
    this.router.navigate(["/menu/request-meeting", this.typeSub]);
  }

  goToConfigMeeting() {
    this.router.navigate(["/menu/set-hours-meetings"]);
  }
}
