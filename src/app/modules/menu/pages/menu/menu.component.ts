import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { ChatsContainerComponent } from "src/app/shared/components/chat/chatsContainer/chatsContainer.component";
import { ChatService } from "src/app/shared/services/chat/chat.service";
import { MessagingService } from "src/app/shared/services/chat/messaging/messaging.service";
import { EventService } from "src/app/shared/services/event/event.service";
import { PermissionsService } from "src/app/shared/services/permissions/permissions.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { ModulesService } from "src/app/shared/services/modules/modules.service";
import { SponsorsService } from "src/app/shared/services/api/sponsors/sponsors.service";
import { LanguageService } from "src/app/shared/services/language/language.service";
import { GuestService } from "src/app/shared/services/guest/guest.service";
import jwt_decode from "jwt-decode";
@Component({
  selector: "menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit, AfterViewChecked {
  selectedEvent?: any = {};

  showBadgeChat = false;

  selectedPath = "/menu/event";

  dayStarts?;
  dayEnds?;

  showNavbar = false;
  styleSideChat = "flex";

  chats: any = [];

  rootPage = ChatsContainerComponent;

  constructor(
    private router: Router,
    private eventSvc: EventService,
    private usersSvc: UsersService,
    public chatService: ChatService,
    private cd: ChangeDetectorRef,
    public messagingSvc: MessagingService,
    public permissionsSvc: PermissionsService,
    public modulesSvc: ModulesService,
    public sponsorsSvc: SponsorsService,
    public languageService: LanguageService,
    private guestSvc: GuestService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
    this.permissionsSvc.setSub();
    this.permissionsSvc.setPermissions();
  }

  ngAfterViewChecked(): void {
    if (this.selectedPath === "/menu/chats") {
      this.styleSideChat = "none";
    } else {
      this.styleSideChat = "flex";
    }
    this.cd.detectChanges();
  }

  async ngOnInit() {
    this.chatService.getChatsForUser();
    this.getEventInfo();
    this.getNotificationsChat();

    const sponsors = await this.sponsorsSvc.getSponsors().then((result) => {
      return result.Sponsors;
    });

    if (sponsors) {
      let sponsorsSize = "";
      if (sponsors.length !== 0) {
        sponsorsSize = " + 80px";
      }
      const mediaQuery = window.matchMedia(
        "screen and (max-height: calc(150px + (" +
          this.modulesSvc.getActiveModulesCount() +
          " * 48px) + (3 * 48px)" +
          sponsorsSize +
          "))"
      );
      this.setFooter(mediaQuery);
      mediaQuery.addListener(this.setFooter);
    }
  }

  logout() {
    // TODO establecer endpoint logout
    this.messagingSvc.deleteToken();
    this.usersSvc.removeSelectedUser();
    window.location.reload();
  }

  setFooter(mediaQuery) {
    const footer = document.getElementById("footer-options");
    if (mediaQuery.matches) {
      footer.style.position = "relative";
    } else {
      footer.style.position = "fixed";
    }
  }

  /**
   * Get info of the event
   */
  async getEventInfo() {
    this.selectedEvent = await this.eventSvc.showInfoEvent().then(
      (result) => this.showInfoEventSuccess(result),
      (result) => this.showInfoEventError(result)
    );
    if (this.selectedEvent) {
      this.messagingSvc.requestPermission();
    }
  }

  /**
   * Succes on showInfoEvent
   *
   * @param result
   */
  showInfoEventSuccess(result) {
    if (result !== null) {
      this.selectedEvent = result;
      return result;
    }

    this.showInfoEventError(result);
  }

  /**
   * Error on showInfoEvent
   *
   * @param result
   */
  showInfoEventError(result) {
    console.log("Error al obtener la info del evento");
  }

  getDays() {
    let startDate = new Date();
    let endDate = new Date();

    if (this.selectedEvent) {
      this.dayStarts = this.selectedEvent.starts;
      this.dayEnds = this.selectedEvent.ends;

      if (this.dayStarts !== undefined) {
        const tSD = this.dayStarts.split(/[- :]/);
        const dSD = new Date(
          tSD[0],
          tSD[1] - 1,
          tSD[2],
          tSD[3],
          tSD[4],
          tSD[5]
        );
        startDate = new Date(dSD);
      }

      if (this.dayEnds !== undefined) {
        const tED = this.dayEnds.split(/[- :]/);
        const dED = new Date(
          tED[0],
          tED[1] - 1,
          tED[2],
          tED[3],
          tED[4],
          tED[5]
        );
        endDate = new Date(dED);
      }

      const date = [];
      date.push(startDate.getDate());
      date.push(startDate.getMonth());
      date.push(startDate.getFullYear());
      date.push(endDate.getDate());
      date.push(endDate.getMonth());
      date.push(endDate.getFullYear());
      return date;
    }
  }

  setActiveItem(url, urls = null, route) {
    let active = false;
    if (urls) {
      urls.forEach((path) => {
        if (path === route) {
          active = true;
        }
      });
    } else {
      if (url === route) {
        active = true;
      }
    }
    return active;
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

  isGuest(guest) {
    this.guestSvc.openPopover(guest);
  }

  isBlocked(guest) {
    if (
      !guest &&
      jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"] === "ANONYMOUS"
    ) {
      return true;
    }
    return false;
  }
}
