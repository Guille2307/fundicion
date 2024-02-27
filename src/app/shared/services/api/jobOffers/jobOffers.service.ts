import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class JobOffersService {
  url = localStorage.getItem("API_URL");

  constructor(private http: HttpClient) {}

  /**
   * Get all job offers
   */
  public getAllJobOffers(): any {
    return this.http
      .get(this.url + "/congress/getalljobs", {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  /**
   * Get job offers by company
   */
  public getJobOffersByCompany(): any {
    return this.http
      .get(this.url + "/congress/getjobsforcompany", {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  /**
   * Set job offer
   *
   * @param offer
   */
  public setJobOffer(offer: any): any {
    return this.http
      .post(this.url + "/congress/setjobs", JSON.stringify(offer), {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  /**
   * Delete job offer
   *
   * @param offerId
   */
  public deleteJobOffer(offerId: any): any {
    return this.http
      .delete(this.url + "/congress/deletejobs/" + offerId, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  /**
   * Update job offer
   *
   * @param offer
   * @param offerId
   */
  public updateJobOffer(offer: any, offerId: any): any {
    const json =
      `{
      "job_id": "` +
      offerId +
      `",
      "title": "` +
      offer.title +
      `",
      "location": "` +
      offer.location +
      `",
      "sector": "` +
      offer.sector +
      `",
      "company": "` +
      offer.company +
      `",
      "vacancies": "` +
      offer.vacancies +
      `",
      "category": "` +
      offer.category +
      `",
      "contract": "` +
      offer.contract +
      `",
      "level": "` +
      offer.level +
      `",
      "schedule": "` +
      offer.schedule +
      `",
      "salary": "` +
      offer.salary +
      `",
      "experience": "` +
      offer.experience +
      `",
      "studies": "` +
      offer.studies +
      `",
      "requirements": "` +
      offer.requirements +
      `",
      "description": "` +
      offer.description +
      `"
    }`;
    return this.http
      .post(this.url + "/congress/updatejob", json, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  /**
   * Get requests for company
   *
   * @param offerId
   */
  public setJobRequest(offerId, request): any {
    const json =
      `{
    "job_id": "` +
      offerId +
      `",
    "presentation": "` +
      request.replace(/\r?\n/g, "<br/>") +
      `"
    }`;
    return this.http
      .post(this.url + "/congress/jobsregistration", json, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result)
      .catch((err) => err);
  }

  /**
   * Get requests for company
   */
  public getRequestsForCompany(): any {
    return this.http
      .get(this.url + "/congress/getjobapplicants", {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }

  /**
   * Get requests for user
   */
  public getRequestsForUser(): any {
    return this.http
      .get(this.url + "/congress/getjobsforuser", {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
      .toPromise()
      .then((result) => result);
  }
}
