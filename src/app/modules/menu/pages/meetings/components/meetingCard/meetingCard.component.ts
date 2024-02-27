import { Router } from "@angular/router";
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ShowProfileUserService } from "src/app/shared/services/api/showProfileUser/showProfileUser.service";
import { AssistantsService } from "src/app/shared/services/api/assistants/assistants.service";
import { AnnotationsService } from "src/app/shared/services/api/annotations/annotations.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "meeting-card",
  templateUrl: "./meetingCard.component.html",
  styleUrls: ["./meetingCard.component.scss"],
})
export class MeetingCardComponent implements OnInit, OnChanges {
  @Input() meet: any = {};
  @Input() typeSub;

  @Input() user;

  annotation: any;

  constructor(
    private route: Router,
    private assistantsSvc: AssistantsService,
    private annotationsSvc: AnnotationsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      if (Object.keys(this.user).length !== 0) {
        // console.log("🚀 ~ file: meetingCard.component.ts ~ line 38 ~ MeetingCardComponent ~ ngOnChanges ~ user", this.user);
      }
    }
  }

  ngOnInit() {
    console.log(this.meet);
  }

  async getAnnotation(userId) {
    this.annotation = await this.annotationsSvc
      .getAnnotation(userId)
      .then((res) => res.Annotations);
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

  goToReviewMeet() {
    sessionStorage.setItem("infoMeeting", JSON.stringify(this.meet));
    this.route.navigate(["/menu/review-meet", this.meet.id]);
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== "null" && value.trim() !== "" && value !== "undefined") {
        return true;
      }
    }
    return false;
  }

  hasAnnotation(value) {
    if (value !== null && value !== undefined) {
      if (value.length !== 0) {
        return true;
      }
    }
    return false;
  }
}
