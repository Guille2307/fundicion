import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ImageProfilePipe } from "../../pipes/imageProfile/imageProfile.pipe";
import * as firebase from "firebase/compat/app";
import jwt_decode from "jwt-decode";
import { JobOffersService } from "../../services/api/jobOffers/jobOffers.service";
import { AnnotationsService } from "../../services/api/annotations/annotations.service";
import { PopoverController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { CreateMeetingService } from "../../services/api/createMeeting/createMeeting.service";
import { ImageFullScreenComponent } from "../../pages/popovers/imageFullScreen/imageFullScreen.component";
import { ConversationContainerComponent } from "../chat/conversationContainer/conversationContainer.component";
import { ChatService } from "../../services/chat/chat.service";
import { ModulesService } from "../../services/modules/modules.service";
import { stringify } from "querystring";

@Component({
  selector: "public-profile-to-show",
  templateUrl: "./publicProfileToShow.component.html",
  styleUrls: ["./publicProfileToShow.component.scss"],
})
export class PublicProfileToShowComponent implements OnInit, OnChanges {
  idAssistant?;
  subAssistant?;
  @Input() profile?;

  @Input() type = 0;
  // User = 0
  // Company = 2

  showChatBtn = true;
  showMeetBtn = true;
  showFiles = false;

  annotations = "";
  arrayAnnotations = [];

  public query: any = "";
  jobOffers = [];

  conversationPage = ConversationContainerComponent;

  constructor(
    private router: Router,
    private jobOffersService: JobOffersService,
    private annotationsService: AnnotationsService,
    public translateService: TranslateService,
    private toastCtrl: ToastController,
    private createMeetingSvc: CreateMeetingService,
    public popoverController: PopoverController,
    private chatSvc: ChatService,
    public modulesSvc: ModulesService
  ) {
    this.idAssistant = jwt_decode(localStorage.getItem("selecteduserJWT"))[
      "id"
    ];
    this.subAssistant = jwt_decode(localStorage.getItem("selecteduserJWT"))[
      "sub"
    ];
    if (this.subAssistant !== "EMPLOYEE") {
      this.showFiles = true;
    } else {
      this.getMeetingsForEmployee();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["profile"].currentValue) {
      if (this.profile) {
        this.showChatBtn = this.chatSvc.showChatMeetButton(this.profile.role);
        this.showMeetBtn = this.chatSvc.showChatMeetButton(this.profile.role);
        this.getAnnotations();
        switch (this.type) {
          case 0:
            this.setImagesAssistant(this.profile.id);
            break;
          case 2:
            this.getJobOffers(this.profile.id);
            break;
        }
      }
    }
  }

  ngOnInit() {}

  async getMeetingsForEmployee() {
    const meetsUser = await this.createMeetingSvc
      .showMeetingForEmployee()
      .then((res) => res.Meetings);
    if (meetsUser) {
      meetsUser.forEach((meet) => {
        if (meet.company_id === this.profile.id) {
          this.showMeetBtn = false;
        }
      });
    }
  }

  async getJobOffers(id) {
    this.jobOffers = [];
    const offers = await this.jobOffersService
      .getAllJobOffers()
      .then((result) => result.jobs);
    if (offers) {
      offers.forEach((offer) => {
        if (offer.user_id === id) {
          this.jobOffers.push(offer);
        }
      });
    }
  }

  async showChatButton() {
    const users = await firebase.default
      .firestore()
      .collection("users")
      .get()
      .then((userData) => {
        const data = [];
        userData.forEach((childData) => {
          if (childData.data()["idAssistant"] !== this.idAssistant) {
            data.push(childData.data());
          }
        });
        return data;
      });
    if (users) {
      users.forEach((user) => {
        if (this.profile.id === user.idAssistant) {
          this.showChatBtn = true;
        }
      });
    }
  }

  goToChatMobile() {
    sessionStorage.clear();
    sessionStorage.setItem("idAssistant", this.profile.id);
    if (this.profile.surnames !== null) {
      sessionStorage.setItem(
        "name",
        this.profile.name + " " + this.profile.surnames
      );
    } else {
      sessionStorage.setItem("name", this.profile.name);
    }
    this.router.navigate(["/menu/chats"]);
  }

  goToChatDesktop() {
    console.log("goToChatDesktop");

    sessionStorage.setItem("idAssistant", this.profile.id);

    if (this.profile.surnames !== null) {
      sessionStorage.setItem(
        "name",
        this.profile.name + " " + this.profile.surnames
      );
    } else {
      sessionStorage.setItem("name", this.profile.name);
    }
    window.location.reload();
  }

  getDate(date) {
    const fullDate = new Date(date);
    // tslint:disable-next-line: max-line-length
    return (
      ("0" + fullDate.getDate()).slice(-2) +
      "/" +
      ("0" + fullDate.getMonth()).slice(-2) +
      "/" +
      fullDate.getFullYear() +
      " - " +
      ("0" + fullDate.getHours()).slice(-2) +
      ":" +
      ("0" + fullDate.getMinutes()).slice(-2) +
      "h"
    );
  }

  setImagesAssistant(id) {
    const imgProfilePipe = new ImageProfilePipe();
    const imgContainer = document.getElementById(
      "img-container-assistant"
    ) as HTMLImageElement;
    if (imgContainer) {
      imgContainer.style.background =
        'url("' +
        imgProfilePipe.transform(id) +
        '") no-repeat center center / cover';
    }
  }

  isValueNull(key, value) {
    if (value !== null && value !== undefined) {
      if (
        value.trim() !== "null" &&
        value.trim() !== "" &&
        value.trim() !== "undefined"
      ) {
        return JSON.parse(this.profile.permission)[key];
      }
    }
    return false;
  }

  // comparison(value1, value2) {
  //   if (this.isValueNull(value1) && this.isValueNull(value2)) {
  //     return 0;
  //   }
  //   if (this.isValueNull(value1) && !this.isValueNull(value2)) {
  //     return 1;
  //   }
  //   if (!this.isValueNull(value1) && this.isValueNull(value2)) {
  //     return 2;
  //   }
  //   return 3;
  // }

  largeName(name: string) {
    let newName = "";
    if (name.length >= 40) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < 40; i++) {
        newName += name[i];
      }
      newName += "...";
    } else {
      newName += name;
    }
    return newName;
  }

  setUrl(url) {
    let http = "";
    for (let i = 0; i < 7; i++) {
      http += url[i];
    }
    let https = "";
    for (let i = 0; i < 8; i++) {
      https += url[i];
    }
    if (http === "http://" || https === "https://") {
      return url;
    } else {
      return "http://" + url;
    }
  }

  setDocName(name) {
    let finalName = "";
    for (let i = 11; i < name.length; i++) {
      finalName += name[i];
    }
    return finalName;
  }

  goToRequestMeet() {
    this.router.navigate(["/menu/request-meeting/", this.profile.id]);
  }

  async getAnnotations() {
    this.arrayAnnotations = await this.annotationsService
      .getAnnotation(this.profile.id)
      .then((result) => result.Annotations);
    if (this.arrayAnnotations) {
      if (this.arrayAnnotations.length !== 0) {
        this.annotations = this.arrayAnnotations[0].annotation;
      }
    }
  }

  saveAnnotation() {
    if (this.arrayAnnotations !== undefined) {
      if (this.arrayAnnotations.length === 0) {
        this.annotationsService
          .setAnnotation(this.profile.id, this.annotations)
          .then((result) => {
            this.presentToast();
            return result;
          });
      } else {
        const annotationId = this.arrayAnnotations[0].id;
        this.annotationsService
          .updateAnnotation(annotationId, this.annotations)
          .then((result) => {
            this.presentToast();
            return result;
          });
      }
    } else {
      this.annotationsService
        .setAnnotation(this.profile.id, this.annotations)
        .then((result) => {
          this.presentToast();
          return result;
        });
    }
  }

  async presentToast() {
    const message = await this.translateService
      .get("MEETINGS.startMeeting.tabs.annotations.toast")
      .toPromise()
      .then((res) => {
        return res;
      });
    if (message) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });
      toast.present();
    }
  }

  async showImage(id) {
    const imgProfilePipe = new ImageProfilePipe();
    const src = imgProfilePipe.transform(id);
    const popover = await this.popoverController.create({
      component: ImageFullScreenComponent,
      componentProps: {
        src,
      },
      cssClass: "image-popover",
      translucent: true,
    });
    return await popover.present();
  }
}
