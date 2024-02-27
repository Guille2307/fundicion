import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SponsorsService {
  url = "https://caapi.woutick.es";
  // url = localStorage.getItem('API_URL');

  eventId = "9d78a972-e034-4e49-8463-c78ccc1f8ff4";

  constructor(private http: HttpClient) {}

  /**
   * Get sponsors
   */
  public getSponsors(): any {
    return this.http
      .get(this.url + "/congress/getsponsors", {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  /**
   * Get sponsors public
   */
  public getSponsorsPublic(): any {
    return this.http
      .get(this.url + "/congress/getsponsorspublic/" + this.eventId)
      .toPromise()
      .then((result) => result);
  }
}
