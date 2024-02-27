import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImagesGalleryService {
  url = localStorage.getItem("API_URL");

  constructor(private http: HttpClient) {}

  /**
   * Get Images
   */
  public getImages(): any {
    return lastValueFrom(
      this.http.get(this.url + "/congress/getgallery", {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
    ).then((result) => result);
  }
}
