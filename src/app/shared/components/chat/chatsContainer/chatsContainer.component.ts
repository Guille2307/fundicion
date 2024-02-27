import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ChatService } from "src/app/shared/services/chat/chat.service";
import jwt_decode from "jwt-decode";
import { TranslateService } from "@ngx-translate/core";
import { AssistantsContainerComponent } from "../assistantsContainer/assistantsContainer.component";
import { GroupContainerComponent } from "../groupContainer/groupContainer.component";
import { IonNav } from "@ionic/angular";
import { ConversationContainerComponent } from "../conversationContainer/conversationContainer.component";
import { Observable } from "rxjs";
import { PermissionsService } from "src/app/shared/services/permissions/permissions.service";

@Component({
  selector: "chats-container",
  templateUrl: "./chatsContainer.component.html",
  styleUrls: ["./chatsContainer.component.scss"],
})
export class ChatsContainerComponent implements OnInit, AfterViewChecked {
  public query: any = "";

  chats: Observable<any[]>;

  flag = true;

  newChatPage = AssistantsContainerComponent;
  newGroupPage = GroupContainerComponent;
  conversationPage = ConversationContainerComponent;

  constructor(
    private chatService: ChatService,
    public translateService: TranslateService,
    private cdRef: ChangeDetectorRef,
    public nav: IonNav,
    public permissionsSvc: PermissionsService
  ) {}

  ngOnInit() {
    if (
      sessionStorage.getItem("idAssistant") ||
      sessionStorage.getItem("uidChat")
    ) {
      this.nav.push(this.conversationPage);
      this.chatService.setForNewChat = false;
    }
    this.getChats();
  }

  ngAfterViewChecked() {
    if (
      sessionStorage.getItem("idAssistant") &&
      this.chatService.setForNewChat
    ) {
      this.nav.push(this.conversationPage);
      this.chatService.setForNewChat = false;
    }
    this.cdRef.detectChanges();
  }

  getChats() {
    this.chatService.contNewMsgs = 0;
    this.chats = this.chatService.getChatsForUser();
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

  isMyMsg(id) {
    if (id === jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]) {
      return true;
    }
    return false;
  }
}
