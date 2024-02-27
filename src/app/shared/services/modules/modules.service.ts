import { Injectable } from "@angular/core";
import { EventService } from "../event/event.service";
import { ProfileService } from "../profile/profile.service";

@Injectable({
  providedIn: "root",
})
export class ModulesService {
  public tickets = false;
  public companies = false;
  public showInfoCompanyCard = true;
  public galleryLink = true;
  public externalGames = true;
  modules = {
    eventInfo: {
      id: "event-info",
      active: true,
      guest: true,
      route: "/menu/event",
      href: null,
      icon: "icon_w_icons_information_circle",
      translation: "MENU.infoEventTabs.info",
      sub: [],
    },

    myInfo: {
      id: "my-info",
      active: true,
      guest: false,
      route: "/menu/profile/my-info",
      href: null,
      icon: "icon_w_icons_face_happy",
      translation: "MENU.myProfileTabs.myInfo",
      sub: [],
    },
    plan: {
      id: "plan",
      active: true,
      guest: false,
      route: "/menu/plan",
      href: null,
      icon: "icon_w_icons_camera",
      translation: "MENU.plan",
      sub: [],
    },
    externalLink2: {
      id: "external-link-2",
      active: true,
      guest: false,
      route: null,
      href: "https://www.google.com/maps/place/Sala+Fundici%C3%B3n/@42.4634417,-2.4536036,17z/data=!4m6!3m5!1s0xd5aab13050a6a71:0x5ee4c72f814ce70d!8m2!3d42.4634843!4d-2.452277!16s%2Fg%2F11rd5w8sv9",
      icon: "icon_w_icons_location_pin",
      translation: "EXTERNAL_LINK.howToGet",
      sub: [],
    },
    companies: {
      id: "companies",
      active: false,
      guest: false,
      route: "/menu/companies",
      href: null,
      icon: "icon_w_icons_exhibitor",
      translation: this.companies ? "MENU.companies" : "MENU.exhibitors",
      sub: [],
    },
    agenda: {
      id: "agenda",
      active: true,
      guest: false,
      route: "/menu/agenda",
      href: null,
      icon: "icon_w_icons_calendar",
      translation: this.tickets ? "MENU.tickets" : "MENU.agenda",
      sub: [],
    },
    accreditation: {
      id: "accreditation",
      active: false,
      guest: false,
      route: "/menu/accreditation",
      href: null,
      icon: "icon_w_icons_ticket",
      translation: "MENU.accreditation",
      sub: [],
    },
    notifications: {
      id: "notifications",
      active: true,
      guest: false,
      route: "/menu/notifications",
      href: null,
      icon: "icon_w_icons_inbox",
      translation: "MENU.notifications",
      sub: [],
    },
    meetings: {
      id: "meetings",
      active: false,
      guest: false,
      route: "/menu/meetings",
      href: null,
      icon: "icon_w_icons_handshake",
      translation: "MENU.meetings",
      sub: [],
    },
    sponsors: {
      id: "sponsors",
      active: true,
      guest: false,
      route: "/menu/sponsors",
      href: null,
      icon: "icon_w_icons_star_podium",
      translation: "MENU.sponsors",
      sub: [],
    },

    assistants: {
      id: "assistants",
      active: true,
      guest: true,
      route: "/menu/assistants",
      href: null,
      icon: "icon_w_icons_people",
      translation: "MENU.assistants",
      sub: ["ADMIN", "PREMIUM"],
    },
    chat: {
      id: "chat",
      active: true,
      guest: true,
      route: "/menu/chats",
      href: null,
      icon: "icon_w_icons_paper_plane",
      translation: "MENU.chat",
      sub: [],
    },
    streamings: {
      id: "streamings",
      active: false,
      guest: false,
      route: "/menu/streamings",
      href: null,
      icon: "icon_w_icons_play_button",
      translation: "MENU.streamings",
      sub: [],
    },
    jobOffers: {
      id: "job-offers",
      active: false,
      guest: false,
      route: "/menu/job-offers",
      href: null,
      icon: "icon_w_icons_calendar",
      translation: "MENU.jobOffers",
      sub: ["PREMIUM", "EMPLOYEE", "ADMIN"],
    },
    gamification: {
      id: "gamification",
      active: true,
      guest: false,
      route: this.externalGames ? null : "/menu/gamification",
      href: this.externalGames ? this.setUrlGamification() : null,
      icon: " icon icon-wicons_ControllerArcade",
      translation: "MENU.gamification",
      sub: [],
    },

    gallery: {
      id: "gallery",
      active: true,
      guest: false,
      route: "/menu/gallery",
      href: null,
      icon: "icon_w_icons_picture",
      translation: "MENU.infoEventTabs.galleryExterna",
      sub: [],
    },
    externalLink: {
      id: "external-link",
      active: true,
      guest: false,
      route: null,
      href: "https://photos.app.goo.gl/tyG5u1fkBn3uuRbw8",
      icon: "icon_w_icons_open_in_new",
      translation: this.galleryLink
        ? "MENU.infoEventTabs.gallery"
        : "EXTERNAL_LINK.tourGuide",
      sub: [],
    },

    coworking: {
      id: "coworking",
      active: false,
      guest: false,
      route: "/menu/coworking",
      href: null,
      icon: "icon_w_icons_CA",
      translation: "MENU.coworking",
      sub: ["PREMIUM", "EMPLOYEE", "ADMIN"],
    },
    meeters: {
      id: "meeters",
      active: false,
      guest: false,
      route: "/menu/event/meeters",
      href: null,
      icon: "icon_w_icons_ban",
      translation: "MENU.infoEventTabs.meeters",
      sub: [],
    },
    foodtrucks: {
      id: "foodtrucks",
      active: false,
      guest: false,
      route: "/menu/activities/foodtrucks",
      href: null,
      icon: "icon_w_icons_ban",
      translation: "MENU.activitiesTabs.foodtrucks",
      sub: [],
    },
    polls: {
      id: "polls",
      active: false,
      guest: false,
      route: "/menu/activities/polls",
      href: null,
      icon: "icon_w_icons_ban",
      translation: "MENU.activitiesTabs.polls",
      sub: [],
    },

    chatHelp: {
      id: "chat-help",
      active: true,
      guest: true,
      route: "/menu/chat-help",
      href: null,
      icon: "icon_w_icons_helpCenter",
      translation: "MENU.chatHelp",
      sub: [],
    },
  };

  public infoTabs = {
    info: {
      show: true,
    },
    program: {
      show: true,
    },
    participants: {
      show: false,
    },
  };

  constructor(
    private profileSvc: ProfileService,
    public eventSvc: EventService
  ) {}

  public getModules() {
    return this.modules;
  }

  public getActiveModulesBySub() {
    const sub = this.profileSvc.sub;
    const modules = [];
    for (let key in this.modules) {
      if (this.modules[key].active) {
        if (this.modules[key].sub.length === 0) {
          modules.push(this.modules[key]);
        } else {
          this.modules[key].sub.forEach((itemSub) => {
            if (sub === itemSub) {
              modules.push(this.modules[key]);
            }
          });
        }
      }
    }
    return modules;
  }

  getActiveModulesCount() {
    let count = 0;
    for (let key in this.modules) {
      if (this.modules[key].active) {
        count++;
      }
    }
    return count;
  }
  setUrlGamification() {
    const eventId = this.eventSvc.eventId;
    const jwt = localStorage.getItem("selecteduserJWT");
    const language = localStorage.getItem("SELECTED_LANGUAGE");
    const primary = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--primaryColor")
      .substring(2);
    const secondary = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--secondaryColor")
      .substring(2);
    const emphasis = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--emphasis")
      .substring(2);
    const interactive = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--interactive")
      .substring(2);
    return (
      "https://gamificacion.woutick.es/games?eventId=" +
      eventId +
      "&jwt=" +
      jwt +
      "&primary=" +
      primary +
      "&secondary=" +
      secondary +
      "&emphasis=" +
      emphasis +
      "&interactive=" +
      interactive +
      "&lng=" +
      language
    );
  }

  goToGamification() {
    window.open(this.setUrlGamification(), "_blank");
  }
}
