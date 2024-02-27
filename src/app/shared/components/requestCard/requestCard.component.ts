import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CreateMeetingService } from "../../services/api/createMeeting/createMeeting.service";

@Component({
  selector: "request-card",
  templateUrl: "./requestCard.component.html",
  styleUrls: ["./requestCard.component.scss"],
})
export class RequestCardComponent implements OnInit {
  @Input() request: any;

  constructor(
    private router: Router,
    private createMeeting: CreateMeetingService
  ) {}

  ngOnInit() {}

  async showRequest(offer) {
    console.log(this.request);
    this.router.navigate(["menu/info/assistant/", this.request.user_id]);
    // TODO:'el codigo de abajo es para mostrar la reunion auntomatica cuando se te postulas al trabajo y te hace la reunion auntomaticamente'

    // const meetings = await this.createMeeting
    //   .showMeetingForCompany()
    //   .then((result) => result.Meetings);
    // if (meetings) {
    //   let meet = null;
    //   meetings.forEach((meeting) => {
    //     if (meeting.user_id === offer.id) {
    //       meet = meeting;
    //     }
    //     // if (meeting.user_id !== null) {
    //     //   JSON.parse(meeting.user_id).forEach((meetOffer) => {
    //     //     if (offer.id_jobRegistration === meetOffer) {
    //     //       meet = meeting;
    //     //     }
    //     //   });
    //     // }
    //   });
    //   if (meet !== null) {
    //     sessionStorage.setItem("infoMeeting", JSON.stringify(meet));
    //     this.router.navigate(["/menu/review-meet", meet.id]);
    //   }
    // }
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== "null" && value.trim() !== "" && value !== "undefined") {
        return true;
      }
    }
    return false;
  }
}
