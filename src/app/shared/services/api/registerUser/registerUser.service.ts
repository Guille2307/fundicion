import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class RegisterUserService {
  // url = localStorage.getItem('API_URL');
  url = "https://caapi.woutick.es";

  eventId = "9d78a972-e034-4e49-8463-c78ccc1f8ff4";

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    public translateService: TranslateService
  ) {}

  /**
   * Register user
   *
   * @param user
   */
  public registerUser(user: any): any {
    const json =
      `{
      "type": "employee",
      "username": "` +
      user.username +
      `",
      "name": "` +
      user.name +
      `",
      "surnames": "` +
      user.surnames +
      `",
      "email": "` +
      user.email +
      `",
      "password": "` +
      user.password +
      `",
      "privacy": "` +
      user.readPolitics +
      `",
      "commercial": "` +
      user.acceptCommunications +
      `",
      "event_id": "` +
      this.eventId +
      `"
    }`;
    return this.http
      .post(this.url + "/congress/register", json)
      .toPromise()
      .then(
        (result) => this.registerUserSuccess(result),
        (result) => this.registerUserError(result)
      );
  }

  /**
   * Success on registerUser
   *
   * @param result
   */
  private registerUserSuccess(result: any): any {
    if (result.error === false) {
      return result;
    }

    return this.registerUserError(result);
  }

  /**
   * Error on registerUser
   *
   * @param result
   */
  private registerUserError(result: any): any {
    this.presentAlertError(result.error.errorType);
    return null;
  }

  async presentAlertError(errorType) {
    const title = await this.translateService
      .get("CREATE_ACCOUNT.alert.error.title")
      .toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService
      .get("CREATE_ACCOUNT.alert.error.message")
      .toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message: message + " <br>(" + errorType + ")",
        buttons: ["Ok"],
      });

      await alert.present();
    }
  }
}
