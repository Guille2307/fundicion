import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ChatService } from "src/app/shared/services/chat/chat.service";
import jwt_decode from "jwt-decode";
import { formatDate } from "@angular/common";
import { IonContent, IonNav } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { VideocallContainerComponent } from "../videocallContainer/videocallContainer.component";
import { InfoContainerComponent } from "../infoContainer/infoContainer.component";
import { Router } from "@angular/router";

@Component({
  selector: "conversation-container",
  templateUrl: "./conversationContainer.component.html",
  styleUrls: ["./conversationContainer.component.scss"],
})
export class ConversationContainerComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  @ViewChild(IonContent) content: IonContent;
  messages: Observable<any[]>;

  @Input() showHeader = true;

  // other's name
  oIdAssistant?;
  name?;

  newMsg = "";

  date?;

  chat?;
  chatUid?;

  sub = jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"];

  videocallPage = VideocallContainerComponent;
  infoPage = InfoContainerComponent;

  constructor(
    public chatService: ChatService,
    public translateService: TranslateService,
    @Inject(LOCALE_ID) private locale: string,
    private cdRef: ChangeDetectorRef,
    private notificationsSvc: NotificationsService,
    public nav: IonNav,
    private router: Router
  ) {}

  ngAfterViewChecked(): void {
    this.name = sessionStorage.getItem("name");
  }

  ngOnInit() {
    this.oIdAssistant = sessionStorage.getItem("idAssistant");
    this.chatUid = sessionStorage.getItem("uidChat");
    this.getMessages();
  }

  ngOnDestroy(): void {
    // sessionStorage.removeItem('idAssistant');
    // sessionStorage.removeItem('name');
    // sessionStorage.removeItem('uidChat');
  }

  ionViewWillEnter(time) {
    setTimeout(() => {
      if (this.content !== undefined) {
        this.content.scrollToBottom(0);
      }
    }, time);
  }

  async getNameMsgGroup(uid) {
    return await this.chatService
      .getNameUserForGroup(uid)
      .then((res) => res.name);
  }

  async getMessages() {
    if (this.chatUid !== undefined && this.chatUid !== null) {
      console.log(this.messages);
      this.chat = await this.chatService
        .getChat(this.chatUid)
        .then((result) => result);
      this.messages = this.chatService.getChatMessages(
        this.chatUid,
        this.content
      );
    } else {
      this.chatUid = await this.chatService.hasConversation(this.oIdAssistant);
      if (this.chatUid !== undefined && this.chatUid !== null) {
        this.chat = await this.chatService
          .getChat(this.chatUid)
          .then((result) => result);
        this.messages = this.chatService.getChatMessages(
          this.chatUid,
          this.content
        );
      }
      console.log(this.chat);
    }
    this.ionViewWillEnter(1000);
  }

  isMyMsg(msg) {
    if (
      msg.from === jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]
    ) {
      return true;
    }
    return false;
  }

  goBack() {
    sessionStorage.removeItem("idAssistant");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("uidChat");
    this.chatService.setForNewChat = true;
    this.nav.popTo(0);
    window.location.reload();
  }

  async sendMessage() {
    if (this.newMsg.trim() !== "") {
      if (this.chatUid !== undefined && this.chatUid !== null) {
        this.chatService
          .addMessage(this.newMsg.trim(), this.chatUid)
          .then(() => {
            this.newMsg = "";
            this.content.scrollToBottom();
          });
      } else {
        this.chatUid = await this.chatService
          .createChat([this.oIdAssistant], this.newMsg.trim())
          .then((res) => res);
        if (this.chatUid) {
          this.messages = this.chatService.getChatMessages(
            this.chatUid,
            this.content
          );
        }
        this.newMsg = "";
        this.content.scrollToBottom();
      }
      this.notificationsSvc.sendNotificationMsg(
        this.oIdAssistant,
        this.newMsg.trim(),
        this.chatUid
      );
    }
  }

  showDate(date, i) {
    if (new Date(date).getDate() !== this.date || i === 0) {
      this.date = new Date(date).getDate();
      return true;
    }
    return false;
  }

  setDate(date) {
    const today =
      new Date().getDate() +
      "" +
      new Date().getMonth() +
      "" +
      new Date().getFullYear();
    const yesterday = this.getYesterday();
    const day =
      new Date(date).getDate() +
      "" +
      new Date(date).getMonth() +
      "" +
      new Date(date).getFullYear();
    if (yesterday === day) {
      return "CHAT.yesterday";
    } else if (today !== day) {
      return formatDate(new Date(date), "EEE dd MMM", this.locale);
    } else if (today === day) {
      return "CHAT.today";
    }
  }

  getYesterday() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.toDateString();
    return (
      new Date(yesterday).getDate() +
      "" +
      new Date(yesterday).getMonth() +
      "" +
      new Date(yesterday).getFullYear()
    );
  }

  goToVideocall() {
    if (this.chatUid !== undefined && this.chatUid !== null) {
      this.chatService.addVideocallMessage(this.chatUid).then(() => {
        this.content.scrollToBottom();
      });
    }
  }
}
