import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { SpeakersService } from "../api/speakers/speakers.service";

@Injectable({
  providedIn: "root",
})
export class EventService {
  eventId = "9d78a972-e034-4e49-8463-c78ccc1f8ff4";
  eventName = "FUNDICION";

  url = "https://caapi.woutick.es";

  selectedEvent?: any = {};

  constructor(private http: HttpClient) {}

  setEvent(event) {
    this.selectedEvent = event;
  }

  getEvent() {
    return this.selectedEvent;
  }

  /**
   * Info of the event
   */
  public showInfoEvent(): any {
    const token = localStorage.getItem("selecteduserJWT");
    if (token) {
      return lastValueFrom(
        this.http.get(this.url + "/congress/event", {
          headers: new HttpHeaders({
            "X-Access-Token": "Bearer " + token,
          }),
        })
      ).then(
        (result) => this.showInfoEventSuccess(result),
        (result) => this.showInfoEventError(result)
      );
    }
  }

  /**
   * Succes on showInfoEvent
   *
   * @param result
   */
  showInfoEventSuccess(result) {
    if (!result.error) {
      if (result.events.length !== 0) {
        this.selectedEvent = result.events[0];
        this.saveEventId(this.selectedEvent.event_id);
        return result.events[0];
      }
    }
    this.showInfoEventError(result);
  }

  /**
   * Error on showInfoEvent
   *
   * @param result
   */
  showInfoEventError(result) {
    return null;
  }

  saveEventId(eventId) {
    localStorage.setItem("eventId", eventId);
  }

  public setSchedule(schedule: any): any {
    schedule.streaming = JSON.stringify(schedule.streaming);
    return lastValueFrom(
      this.http.post(
        this.url + "/congress/schedule",
        JSON.stringify(schedule),
        {
          headers: new HttpHeaders({
            "X-Access-Token":
              "Bearer " + localStorage.getItem("selecteduserJWT"),
          }),
        }
      )
    ).then((result) => result);
  }

  public deleteSchedule(scheduleId: any): any {
    return lastValueFrom(
      this.http.delete(this.url + "/congress/schedule/" + scheduleId, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
    ).then((result) => result);
  }

  public updateSchedule(schedule: any, scheduleId: any): any {
    schedule.streaming = JSON.stringify(schedule.streaming);
    return lastValueFrom(
      this.http.post(
        this.url + "/congress/schedule/" + scheduleId,
        JSON.stringify(schedule),
        {
          headers: new HttpHeaders({
            "X-Access-Token":
              "Bearer " + localStorage.getItem("selecteduserJWT"),
          }),
        }
      )
    ).then((result) => result);
  }
}
