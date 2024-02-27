import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChangePasswordService {
  url = "https://caapi.woutick.es";
  eventId = localStorage.getItem("eventId");

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    public translateService: TranslateService
  ) {}

  /**
   * Cambio de la contraseña
   *
   * @param password
   */
  public changePasswordUser(password: string): any {
    const json =
      `{
     "password": "` +
      password +
      `"
    }`;
    return lastValueFrom(
      this.http.post(this.url + "/congress/changepassword", json, {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
    ).then(
      (result) => this.changePasswordUserSuccess(result),
      (result) => this.changePasswordUserError(result)
    );
  }

  /**
   * Éxito en el cambio de contraseña
   *
   * @param result
   */
  private changePasswordUserSuccess(result: any): any {
    if (result.error === false) {
      return result;
    }

    return this.changePasswordUserError(result);
  }

  /**
   * Error en el cambio de contraseña
   *
   * @param result
   */
  private changePasswordUserError(result: any): any {
    this.presentAlertError(result.error.errorType);
    return null;
  }

  async presentAlertError(errorType) {
    const title = await this.translateService
      .get("CHANGE_PASS.alert.error.title")
      .toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService
      .get("CHANGE_PASS.alert.error.message")
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

  /**
   * Reset de la contraseña
   *
   * @param password
   */
  public resetPasswordUser(email: string): any {
    const json =
      `{
     "email": "` +
      email +
      `",
     "event_id": "` +
      this.eventId +
      `"
    }`;
    return lastValueFrom(
      this.http.post(this.url + "/congress/resetpassword", json)
    ).then((result) => result);
  }

  /**
   * Cambio de la contraseña por token
   *
   * @param password
   */
  public changePasswordUserUrl(
    email: string,
    eventId: string,
    token: string,
    password: string
  ): any {
    const json =
      `{
     "email": "` +
      email +
      `",
     "event_id": "` +
      eventId +
      `",
     "token": "` +
      token +
      `",
     "password": "` +
      password +
      `"
    }`;
    return lastValueFrom(
      this.http.post(this.url + "/congress/changepasswordurl", json)
    ).then((result) => result);
  }
}
