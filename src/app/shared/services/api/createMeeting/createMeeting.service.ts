import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CreateMeetingService {
  url = localStorage.getItem("API_URL");

  constructor(private http: HttpClient) {}

  public createMeet(companyId, presentationText, starts, offerId): any {
    const json =
      `{
      "company_id": "` +
      companyId +
      `",
      "presentation": "` +
      presentationText.replace(/\r?\n/g, "<br/>") +
      `",
      "starts": "` +
      starts +
      `",
      "offer": "[\\"` +
      offerId +
      `\\"]"
    }`;
    return this.http
      .post(this.url + "/congress/createmeeting", json, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  public createMeetWithouOffer(companyId, presentationText, starts): any {
    const json =
      `{
      "company_id": "` +
      companyId +
      `",
      "presentation": "` +
      presentationText.replace(/\r?\n/g, "<br/>") +
      `",
      "starts": "` +
      starts +
      `",
      "offer": "[]"
    }`;
    return this.http
      .post(this.url + "/congress/createmeeting", json, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  public createMeetForCompany(companyId, starts): any {
    const json =
      `{
      "company_id": "` +
      companyId +
      `",
      "starts": "` +
      starts +
      `",
      "presentation": "` +
      null +
      `"
    }`;
    return this.http
      .post(this.url + "/congress/createmeetingforcompany", json, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  public showMeetingForEmployee(): any {
    return this.http
      .get(this.url + "/congress/showMeetingForUser", {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  public showMeetingForCompany(): any {
    return lastValueFrom(
      this.http.get(this.url + "/congress/showMeetingForCompany", {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
    ).then((result) => result);
  }

  public changeMeetinStatus(statusCard, meetId): any {
    const json =
      `{
      "status": "` +
      statusCard +
      `",
      "meet_id": "` +
      meetId +
      `"
    }`;
    return this.http
      .post(this.url + "/congress/changemeetingstatus", json, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  public getHoursForCompany(companyId): any {
    return this.http
      .get(this.url + "/congress/gethourcompany/" + companyId, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result)
      .catch(() => []);
  }

  public editOfferMeeting(meetId, offerId): any {
    const json =
      `{
      "meet_id": "` +
      meetId +
      `",
      "offer": ` +
      JSON.stringify(offerId) +
      `
    }`;
    return this.http
      .post(this.url + "/congress/changeoffermeeting", json, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  public deleteMeeting(meetId): any {
    return this.http
      .delete(this.url + "/congress/deletemeeting/" + meetId, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }
}
