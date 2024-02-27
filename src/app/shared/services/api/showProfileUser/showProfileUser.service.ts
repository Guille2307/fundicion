import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShowProfileUserService {
  url = "https://caapi.woutick.es";

  public dataToEdit: any = null;

  jwt;

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
  public showProfileUser(): any {
    return lastValueFrom(
      this.http.get(this.url + "/congress/profile", {
        headers: new HttpHeaders({
          "X-Access-Token": "Bearer " + localStorage.getItem("selecteduserJWT"),
        }),
      })
    ).then(
      (result) => this.showProfileUserSuccess(result),
      (result) => this.showProfileUserError(result)
    );
  }

  /**
   * Success on registerUser
   *
   * @param result
   */
  private showProfileUserSuccess(result: any): any {
    if (result.error === false) {
      return result;
    }

    return this.showProfileUserError(result);
  }

  /**
   * Error on registerUser
   *
   * @param result
   */
  private showProfileUserError(result: any): any {
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
