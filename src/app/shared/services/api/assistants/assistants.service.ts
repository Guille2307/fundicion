import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Pipe } from "@angular/core";
import jwt_decode from "jwt-decode";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AssistantsService {
  url = "https://caapi.woutick.es";

  eventId = "9d78a972-e034-4e49-8463-c78ccc1f8ff4";

  assistants = [];

  constructor(private http: HttpClient) {}

  public getAssistants(): any {
    return lastValueFrom(
      this.http.get(this.url + "/congress/users/" + this.eventId, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
    )
      .then((result) => result)
      .catch((result) => false);
  }

  public getList(assistants: []) {
    let users = [];
    const sub = jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"];
    switch (sub) {
      case "EMPLOYEE":
        users = this.getListToShow(["PREMIUM"], assistants);
        break;
      case "BASIC":
        users = this.getListToShow(["EMPLOYEE", "ADMIN"], assistants);
        break;
      case "MEDIUM":
        users = this.getListToShow(["EMPLOYEE", "ADMIN"], assistants);
        break;
      case "PREMIUM":
        users = this.getListToShow(["EMPLOYEE", "ADMIN"], assistants);
        break;
      case "ADMIN":
        users = this.getListToShow(
          ["EMPLOYEE", "PREMIUM", "BASIC", "ADMIN"],
          assistants
        );
        break;
    }
    return users;
  }

  public getListToShow(rolesToShow: any, assistants: any) {
    const users = [];
    assistants.forEach((assistant) => {
      rolesToShow.forEach((role) => {
        if (assistant.role === role) {
          users.push(assistant);
        }
      });
    });
    return users;
  }
}
