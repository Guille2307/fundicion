import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { ChatService } from "../../chat/chat.service";
import jwt_decode from "jwt-decode";
import { UsersService } from "../../users/users.service";

@Injectable({
  providedIn: "root",
})
export class UserLoginService {
  // url = localStorage.getItem('API_URL');
  url = "https://caapi.woutick.es";

  passNewAccount = null;

  eventId = "9d78a972-e034-4e49-8463-c78ccc1f8ff4";

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    public translateService: TranslateService,
    public chatService: ChatService,
    public usersService: UsersService
  ) {}

  /**
   * Login user
   *
   * @param user
   */
  public loginUser(user: any): any {
    const json =
      `{
      "email": "` +
      user.username +
      `",
      "password": "` +
      user.password +
      `",
      "event_id": "` +
      this.eventId +
      `"
    }`;
    return this.http
      .post(this.url + "/congress/login", json)
      .toPromise()
      .then(
        (result) => this.loginUserSuccess(result, user),
        (result) => this.loginUserError(result)
      );
  }

  public loginUserNewAccount(email, password): any {
    this.passNewAccount = password;
    const json =
      `{
      "email": "` +
      email +
      `",
      "password": "` +
      password +
      `",
      "event_id": "` +
      this.eventId +
      `"
    }`;
    return this.http
      .post(this.url + "/congress/login", json)
      .toPromise()
      .then(
        (result) => {
          if (jwt_decode(result["token"]) !== null) {
            this.usersService.saveUserJWT(
              result["token"],
              jwt_decode(result["token"])["name"],
              true
            );
            this.usersService.setSelectedUser(result);
          }
          return result;
        },
        (result) => result
      );
  }

  public loginGuest(): any {
    const json =
      `{
      "event": "` +
      this.eventId +
      `"
    }`;
    return this.http
      .post(this.url + "/congress/prelogin", json)
      .toPromise()
      .then(
        (result) => this.loginGuestSuccess(result),
        (result) => this.loginUserError(result)
      );
  }

  loginGuestSuccess(result) {
    if (result !== null) {
      this.usersService.saveUserJWT(result.token, "guest", true);
      this.usersService.setSelectedUser(result);
    } else {
      this.loginUserError(result);
    }
    return result;
  }

  /**
   * Success on loginUser
   *
   * @param result
   */
  private loginUserSuccess(result: any, user: any): any {
    const chatUser = {
      email: user.username,
      password: user.password,
      idAssistant: jwt_decode(result["token"])["id"],
      name:
        jwt_decode(result["token"])["name"] +
        " " +
        jwt_decode(result["token"])["surnames"],
    };
    this.chatService.signIn(chatUser);
    return result;
  }

  /**
   * Error on loginUser
   *
   * @param result
   */
  private loginUserError(result: any): any {
    this.presentAlertError(result.error.errorType);
    return null;
  }

  async presentAlertError(errorType) {
    const title = await this.translateService
      .get("LOGIN_ACCOUNT.alert.error.title")
      .toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService
      .get("LOGIN_ACCOUNT.alert.error.message")
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
