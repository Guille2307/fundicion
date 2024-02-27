import {
  AfterViewChecked,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ImageProfilePipe } from "src/app/shared/pipes/imageProfile/imageProfile.pipe";
import { ImageSchedulePipe } from "src/app/shared/pipes/imageSchedule/imageSchedule.pipe";
import { ScheduleUserService } from "src/app/shared/services/api/scheduleUser/scheduleUser.service";

@Component({
  selector: "info-schedule",
  templateUrl: "./infoSchedule.component.html",
  styleUrls: ["./infoSchedule.component.scss"],
})
export class InfoScheduleComponent implements OnInit, AfterViewChecked {
  activity?;

  iframeUrl?;
  sanitizedUrl?;
  urlVenta = "https://iframe.woutick.es";

  streaming = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private scheduleUserSvc: ScheduleUserService,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {
    this.activatedRoute.params.subscribe((params) =>
      this.getInfo(params["activity"])
    );
  }

  ngOnInit() {}

  ngAfterViewChecked(): void {
    if (this.activity) {
      if (this.activity.photo) {
        this.setImagesSchedule(this.activity.photo);
      }
    }
  }

  /**
   * Get info of the activity
   */
  async getInfo(id) {
    this.activity = await this.scheduleUserSvc
      .getInfoSchedule(id)
      .then((result) => result["schedule"]);

    if (this.activity) {
      this.streaming = JSON.parse(this.activity.streaming);
      if (this.activity.iframe !== null && this.activity.iframe.trim() !== "") {
        this.iframeUrl = this.getSafeUrl(this.activity.iframe.split('"')[1]);
        const iframe = this.activity.iframe.split('"')[1].split("/");
        this.sanitizedUrl = this.getSafeUrl(
          this.urlVenta +
            "?id=" +
            iframe[4] +
            "&entradas=" +
            iframe[5].replace("?", "&").replace("\\", "")
        );
      }
    }
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goToStreaming() {
    this.router.navigate(["/menu/streamings"]);
    // this.router.navigate(['/menu/streamings/id/a0a4ac8f-40df-4885-8ee1-09b41ef6754f']);
  }

  goToTicketsSale() {
    window.open(this.activity.url_venta, "_blank");
  }

  setImagesSchedule(id) {
    const imgSchedulePipe = new ImageSchedulePipe();
    const imgContainer = document.getElementById(
      "img-container"
    ) as HTMLImageElement;
    if (imgContainer) {
      imgContainer.style.background =
        'url("' +
        imgSchedulePipe.transform(id) +
        '") no-repeat center center / cover';
    }
  }

  setImages(id) {
    const imgProfilePipe = new ImageProfilePipe();
    const imgContainer = document.getElementById(
      "img-container"
    ) as HTMLImageElement;
    if (imgContainer) {
      imgContainer.style.background =
        'url("' +
        imgProfilePipe.transform(id) +
        '") no-repeat center center / cover';
    }
  }

  addToSchedule() {
    this.activity.assistance = !this.activity.assistance;
    if (this.activity.assistance) {
      this.scheduleUserSvc.addToSchedule(this.activity.id).then((result) => {
        window.location.reload();
        return result;
      });
    } else {
      this.scheduleUserSvc
        .deleteFromSchedule(this.activity.id)
        .then((result) => {
          window.location.reload();
          return result;
        });
    }
  }

  getDate(date) {
    let iosDate = new Date().getTime();
    const tSD = date.split(/[- :]/);
    const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
    iosDate = new Date(dSD).getTime();
    // tslint:disable-next-line: max-line-length
    return (
      ("0" + new Date(iosDate).getDate()).slice(-2) +
      "/" +
      ("0" + (new Date(iosDate).getMonth() + 1)).slice(-2) +
      "/" +
      new Date(iosDate).getFullYear() +
      " - " +
      ("0" + new Date(iosDate).getHours()).slice(-2) +
      ":" +
      ("0" + new Date(iosDate).getMinutes()).slice(-2) +
      "h"
    );
  }

  largeName(name: string) {
    let newName = "";
    if (name.length >= 71) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < 71; i++) {
        newName += name[i];
      }
      newName += "...";
    } else {
      newName += name;
    }
    return newName;
  }

  parseBody(body: string) {
    if (body) {
      return body.replace(/(http.*?\s)/, '<a target="_blank" href="$1">$1</a>');
    }
  }

  infoSpeaker(id) {
    if (id.profile) {
      this.router.navigate(["/menu/info/assistant/" + id]);
    } else {
      this.router.navigate(["/menu/info/speaker/" + id]);
    }
  }
}
