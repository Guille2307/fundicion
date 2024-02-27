import { Component, Inject, Input, LOCALE_ID, OnInit } from "@angular/core";
import { AssistantsService } from "src/app/shared/services/api/assistants/assistants.service";
import { ChatService } from "src/app/shared/services/chat/chat.service";
import jwt_decode from "jwt-decode";
import { formatDate } from "@angular/common";
import { ConversationContainerComponent } from "../conversationContainer/conversationContainer.component";

@Component({
  selector: "chat-item",
  templateUrl: "./chatItem.component.html",
  styleUrls: ["./chatItem.component.scss"],
})
export class ChatItemComponent implements OnInit {
  @Input() chat?;
  userMsg: any;

  contUnseenMsgs = 0;
  user?;
  idUser?;
  lastMsg?;
  timeLastMsg?;
  itsMe = false;

  assistants: any;

  nextPage = ConversationContainerComponent;

  constructor(
    private chatService: ChatService,
    private assistantsSvc: AssistantsService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    // this.getUser();

    if (this.chat) {
      // console.log(this.chat);
      this.getInfoMsgs(this.chat.uid);

      this.getLastMsg(this.chat);
      this.lastMsgMine(this.chat);
      if (!this.chat.isGroup) {
        this.getUnseenMsgs(this.chat);
        this.getIdUser(this.chat);
      }
    }
  }

  getInfoMsgs(uid) {
    if (this.chat.isGroup) {
      this.userMsg = this.chatService.getNameLastMessage(uid);
    } else {
      this.userMsg = this.chatService.getNameUser(uid);
    }
  }

  getUnseenMsgs(chat) {
    chat.messages.forEach((msg) => {
      if (
        !msg.seen &&
        msg.from !== jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]
      ) {
        this.contUnseenMsgs++;
      }
    });
    this.chatService.contNewMsgs += this.contUnseenMsgs;
  }

  getIdUser(chat) {
    chat.users.forEach((user) => {
      if (user !== jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]) {
        this.idUser = user;
      }
    });
  }

  async getUser() {
    this.assistants = await this.assistantsSvc
      .getAssistants()
      .then((res) => res.users);
    console.log("desde item", this.assistants);
    if (this.assistants) {
      this.assistants.forEach((assistant) => {
        if (assistant.id === this.idUser) {
          this.user = assistant;
        }
      });
    }
  }

  getLastMsg(chat) {
    if (chat.messages.length !== 0) {
      this.lastMsg = chat.messages[chat.messages.length - 1].msg;
      this.timeLastMsg = chat.messages[chat.messages.length - 1].createdAt;
    } else {
      this.lastMsg = "CHAT.noMessages";
      this.timeLastMsg = chat.createdAt.toDate().getTime();
    }
  }

  lastMsgMine(chat) {
    if (chat.messages.length !== 0) {
      const id = chat.messages[chat.messages.length - 1].from;
      if (id === jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]) {
        this.itsMe = true;
      }
    }
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
      return formatDate(new Date(date), "dd/MM/yyyy", this.locale);
    } else if (today === day) {
      return formatDate(new Date(date), "HH:mm", this.locale);
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

  goToChat(chat) {
    this.chatService.setForNewChat = false;
    sessionStorage.setItem("uidChat", chat.uid);
    if (chat.isGroup) {
      sessionStorage.setItem("name", chat.name);
    } else {
      this.userMsg.subscribe((name) => {
        sessionStorage.setItem("idAssistant", this.idUser);
        sessionStorage.setItem("name", name);
      });
    }
  }
}
