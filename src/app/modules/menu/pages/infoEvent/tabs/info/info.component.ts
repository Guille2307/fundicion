import { Component, OnInit } from "@angular/core";
import { Console } from "console";
import { EmbedVideoService } from "ngx-embed-video";
import { EventService } from "src/app/shared/services/event/event.service";

@Component({
  selector: "info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent implements OnInit {
  event?: any;

  iframeHtml?;

  constructor(
    private eventSvc: EventService,
    public embedService: EmbedVideoService
  ) {}

  ngOnInit() {
    this.getEventInfo();
  }

  getUrl() {
    if (this.event.video) {
      const url = this.event.video.trim();
      if (url !== "") {
        this.iframeHtml = this.embedService.embed(url, {
          query: { portrait: 0, color: "000000" },
          attr: { width: "100%", height: 315 },
        });
      }
    }
  }

  /**
   * Get info of the event
   */
  async getEventInfo() {
    this.event = await this.eventSvc.showInfoEvent().then((result) => result);
    if (this.event) {
      this.getUrl();
    }
  }

  parseBody(body: string) {
    return body;
    if (body) {
      return body.replace(/(http.*?\s)/, '<a target="_blank" href="$1">$1</a>');
    }
  }
}
