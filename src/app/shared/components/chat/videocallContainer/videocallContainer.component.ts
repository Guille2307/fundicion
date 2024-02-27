import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { IonNav } from "@ionic/angular";
import jwt_decode from "jwt-decode";
import { ChatService } from "src/app/shared/services/chat/chat.service";

@Component({
  selector: "videocall-container",
  templateUrl: "./videocallContainer.component.html",
  styleUrls: ["./videocallContainer.component.scss"],
})
export class VideocallContainerComponent implements OnInit, OnDestroy {
  name?;
  chatUid?;

  private jitsi: any;

  constructor(public chatService: ChatService, public nav: IonNav) {}

  ngOnInit() {
    this.name = sessionStorage.getItem("name");
    this.chatUid = sessionStorage.getItem("uidChat");
    this.openMeet();
  }

  ngOnDestroy(): void {
    if (this.jitsi) {
      this.jitsi.executeCommand("hangup");
      this.chatService.showVideocall = true;
    }
  }

  goBack() {
    if (this.jitsi) {
      this.jitsi.executeCommand("hangup");
      this.chatService.showVideocall = true;
    }
    this.nav.popTo(1);
  }

  openMeet() {
    // tslint:disable-next-line: max-line-length
    const name =
      jwt_decode(localStorage.getItem("selecteduserJWT"))["name"] +
      " " +
      jwt_decode(localStorage.getItem("selecteduserJWT"))["surnames"];
    const domain = "meet.jit.si";
    const options = {
      roomName: this.chatUid,
      // width: 700,
      height: "95%",
      parentNode: document.querySelector("#meet"),
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
        liveStreamingEnabled: true,
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
          "livestreaming",
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
    if (this.chatService.showVideocall) {
      this.jitsi = new (window as any).JitsiMeetExternalAPI(domain, options);
      this.jitsi.addEventListener("readyToClose", () => {
        this.chatService.showVideocall = true;
      });
      this.chatService.showVideocall = false;
    }
  }
}
