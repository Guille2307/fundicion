import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import jwt_decode from "jwt-decode";
import { AssistantsService } from "src/app/shared/services/api/assistants/assistants.service";
import { Router } from "@angular/router";
import { CreateMeetingService } from "src/app/shared/services/api/createMeeting/createMeeting.service";

@Component({
  selector: "meeting",
  templateUrl: "./meeting.component.html",
  styleUrls: ["./meeting.component.scss"],
})
export class MeetingComponent implements OnInit, OnDestroy {
  selectedTab = "meeter";

  meet = JSON.parse(sessionStorage.getItem("infoMeeting"));

  meetId = JSON.parse(sessionStorage.getItem("infoMeeting")).id;
  sub = jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"];
  private jitsi: any;

  annotations = "";
  arrayAnnotations = [];

  otherProfile;

  timeLeft = "00:00";
  littleTime = false;

  interval;

  constructor(
    private location: Location,
    private assistantsSvc: AssistantsService,
    public router: Router,
    private createMeetingSvc: CreateMeetingService
  ) {}

  ngOnInit() {
    this.getProfile();
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.jitsi) {
      this.jitsi.executeCommand("hangup");
    }
    clearInterval(this.interval);
  }

  startTimer() {
    let iosDate = new Date().getTime();
    const tSD = this.meet.starts.split(/[- :]/);
    const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
    iosDate = new Date(dSD).getTime();

    const ends = new Date(iosDate);
    ends.setMinutes(ends.getMinutes() + 15);
    const countDownDate = ends.getTime();
    if (countDownDate > new Date().getTime()) {
      this.openMeet();
    }
    this.interval = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      this.timeLeft =
        ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
      if (minutes < 1) {
        this.littleTime = true;
      }

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(this.interval);

        if (this.jitsi) {
          this.jitsi.executeCommand("hangup");
        }
        this.timeLeft = "00:00";
        if (this.sub !== "EMPLOYEE") {
          this.createMeetingSvc
            .changeMeetinStatus("Celebrated", this.meetId)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        this.router.navigate(["menu/meetings"]);
      }
    }, 1000);
  }

  async getProfile() {
    let otherUserId;
    let assistants = [];

    if (this.sub === "EMPLOYEE") {
      otherUserId = JSON.parse(
        sessionStorage.getItem("infoMeeting")
      ).company_id;
    } else {
      otherUserId = JSON.parse(sessionStorage.getItem("infoMeeting")).user_id;
    }
    if (this.assistantsSvc.assistants.length !== 0) {
      assistants = this.assistantsSvc.assistants;
    } else {
      assistants = await this.assistantsSvc
        .getAssistants()
        .then((result) => result.users);
    }
    if (assistants) {
      assistants.forEach((assistant) => {
        if (assistant.id === otherUserId) {
          this.otherProfile = assistant;
        }
      });
    }
  }

  getSize() {
    const switchContainer = document.getElementById("switch-container");

    const orientation = window.screen.orientation;
    const width = window.innerWidth;
    if (orientation.type === "landscape-primary" && width < 1388) {
      if (switchContainer !== null) {
        switchContainer.classList.add("height");
      }
      return true;
    }
    this.selectedTab = "meeter";
    if (switchContainer !== null) {
      switchContainer.classList.remove("height");
    }
    return false;
  }

  goBack() {
    if (this.jitsi) {
      this.jitsi.executeCommand("hangup");
    }
    const userId = ""; // TODO conseguir el id del otro usuario con el que está teniendo la reunión
    if (sessionStorage.getItem("idAssistant") === userId) {
      sessionStorage.removeItem("idAssistant");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("uidChat");
    }
    this.location.back();
  }

  segmentChanged(ev: any) {
    const value = ev.detail.value;
    this.selectedTab = value;
  }

  openMeet() {
    // tslint:disable-next-line: max-line-length
    const name =
      jwt_decode(localStorage.getItem("selecteduserJWT"))["name"] +
      " " +
      jwt_decode(localStorage.getItem("selecteduserJWT"))["surnames"];
    const domain = "meet.jit.si";
    const options = {
      roomName: this.meetId,
      // width: 700,
      height: "100%",
      parentNode: document.querySelector("#meeting"),
      configOverwrite: {
        startAudioOnly: true,
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        enableClosePage: false,
        disableProfile: true,
        disableInviteFunctions: true,
        enableCalendarIntegration: false,
        disableDeepLinking: true,
        hideConferenceSubject: true,
        hideConferenceTimer: true,
      },
      interfaceConfigOverwrite: {
        DEFAULT_LOGO_URL: "assets/img/fake.png",
        JITSI_WATERMARK_LINK: "https://woutick.es/",
        BRAND_WATERMARK_LINK: "https://woutick.es/",
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "desktop",
          "settings",
          "hangup",
          "fullscreen",
          "filmstrip",
          "tileview",
          "videoquality",
        ],
        VIDEO_QUALITY_LABEL_DISABLED: false,
        SHOW_CHROME_EXTENSION_BANNER: false,
        SHOW_POWERED_BY: false,
        SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        SHOW_DEEP_LINKING_IMAGE: false,
      },
      userInfo: {
        email: jwt_decode(localStorage.getItem("selecteduserJWT"))["email"],
        displayName: name,
      },
    };
    this.jitsi = new (window as any).JitsiMeetExternalAPI(domain, options);
    this.jitsi.addEventListener("readyToClose", () => {
      this.goBack();
    });
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (
        value.trim() !== "null" &&
        value.trim() !== "" &&
        value.trim() !== "undefined"
      ) {
        return true;
      }
    }
    return false;
  }

  comparison(value1, value2) {
    if (this.isValueNull(value1) && this.isValueNull(value2)) {
      return 0;
    }
    if (this.isValueNull(value1) && !this.isValueNull(value2)) {
      return 1;
    }
    if (!this.isValueNull(value1) && this.isValueNull(value2)) {
      return 2;
    }
    return 3;
  }

  goToProfile() {
    this.router.navigate(["/menu/info/assistant/" + this.otherProfile.id]);
  }

  getFullName() {
    let fullname = "";
    if (this.isValueNull(this.otherProfile.name)) {
      fullname = this.otherProfile.name;
    }
    if (this.isValueNull(this.otherProfile.surnames)) {
      fullname += " " + this.otherProfile.surnames;
    }
    return fullname;
  }
}
