import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import jwt_decode from "jwt-decode";
import { ChatService } from "../../services/chat/chat.service";
import { GuestService } from "../../services/guest/guest.service";
import { ModulesService } from "../../services/modules/modules.service";

@Component({
  selector: "chat-and-profile",
  templateUrl: "./chatAndProfile.component.html",
  styleUrls: ["./chatAndProfile.component.scss"],
})
export class ChatAndProfileComponent implements OnInit {
  userId = jwt_decode(localStorage.getItem("selecteduserJWT"))["id"];

  showBadgeChat = false;

  constructor(
    private router: Router,
    public chatService: ChatService,
    public modulesSvc: ModulesService,
    private guestSvc: GuestService
  ) {}

  ngOnInit() {
    this.getNotificationsChat();
  }

  goToChat() {
    if (
      !this.modulesSvc.getModules().chat.guest &&
      jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"] === "ANONYMOUS"
    ) {
      this.guestSvc.openPopover(this.modulesSvc.getModules().chat.guest);
    } else {
      this.router.navigate(["/menu/chats"]);
    }
  }

  goToProfile() {
    if (
      !this.modulesSvc.getModules().myInfo.guest &&
      jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"] === "ANONYMOUS"
    ) {
      this.guestSvc.openPopover(this.modulesSvc.getModules().myInfo.guest);
    } else {
      this.router.navigate(["/menu/profile/my-info"]);
    }
  }

  getNotificationsChat() {
    setInterval(() => {
      if (this.chatService.contNewMsgs !== 0) {
        this.showBadgeChat = true;
      } else {
        this.showBadgeChat = false;
      }
    }, 3000);
  }
}
