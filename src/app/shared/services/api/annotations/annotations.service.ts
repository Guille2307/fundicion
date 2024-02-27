import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AnnotationsService {
  url = localStorage.getItem("API_URL");

  constructor(private http: HttpClient) {}

  public setAnnotation(userId, annotation): any {
    const json =
      `{
      "userAnnotation_id": "` +
      userId +
      `",
      "annotation": "` +
      annotation +
      `"
    }`;
    return lastValueFrom(
      this.http.post(this.url + "/congress/setannotation", json, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
    ).then((result) => result);
  }

  public updateAnnotation(annotationId, annotation): any {
    const json =
      `{
      "annotation_id": "` +
      annotationId +
      `",
      "annotation": "` +
      annotation +
      `"
    }`;
    return lastValueFrom(
      this.http.post(this.url + "/congress/updateannotation", json, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
    ).then((result) => result);
  }

  public getAnnotation(userId): any {
    return lastValueFrom(
      this.http.get(this.url + "/congress/showannotationforuser/" + userId, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
    )
      .then((result) => result)
      .catch((result) => false);
  }

  public deleteAnnotation(annotationId): any {
    return lastValueFrom(
      this.http.delete(
        this.url + "/congress/deleteannotation/" + annotationId,
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
