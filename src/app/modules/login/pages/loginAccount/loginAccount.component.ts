import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsersService } from "src/app/shared/services/users/users.service";
import jwt_decode from "jwt-decode";
import { UserLoginService } from "src/app/shared/services/api/loginUser/loginUser.service";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { PermissionsService } from "src/app/shared/services/permissions/permissions.service";

@Component({
  selector: "login-account",
  templateUrl: "./loginAccount.component.html",
  styleUrls: ["./loginAccount.component.scss"],
})
export class LoginAccountComponent implements OnInit {
  // Class variables
  public loginForm: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
    remember: [true],
  });

  public showPass = false;

  public loginFormError: string = null;

  showTooltip = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private loginUserService: UserLoginService,
    public alertController: AlertController,
    public translateService: TranslateService,
    public permissionsSvc: PermissionsService
  ) {}

  ngOnInit() {
    // localStorage.setItem('selecteduserJWT', null);
  }

  /**
   * Checks if the form is valid
   */
  public isLoginDisabled(): boolean {
    return this.loginForm.valid;
  }

  /**
   * Submits the login form
   */
  public login(): void {
    if (this.isLoginDisabled()) {
      this.loginUserService.loginUser(this.loginForm.value).then(
        (result) => this.loginUserSuccess(result),
        (result) => this.loginUserError(result)
      );
    } else {
      // this.presentAlert();
      this.showTooltip = true;
    }
  }

  async presentAlert() {
    const title = await this.translateService
      .get("LOGIN_ACCOUNT.alert.errorMail.title")
      .toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService
      .get("LOGIN_ACCOUNT.alert.errorMail.message")
      .toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message,
        buttons: ["Ok"],
      });

      await alert.present();
    }
  }

  goBack() {
    this.location.back();
  }

  showHidePass() {
    const inputPass = document.getElementById("password");
    if (inputPass["type"] === "password") {
      inputPass["type"] = "text";
    } else {
      inputPass["type"] = "password";
    }
    this.showPass = !this.showPass;
  }

  /**
   * Success on login user
   *
   * @param result
   */
  private loginUserSuccess(result: any): void {
    if (result !== null) {
      // There is no error
      if (jwt_decode(result["token"]) !== null) {
        this.usersService.saveUserJWT(
          result.token,
          jwt_decode(result["token"])["name"],
          this.loginForm.value.remember
        );
        this.usersService.setSelectedUser(result);
        if (result["changePassword"]) {
          if (result["changePassword"].toLowerCase() === "true") {
            this.router.navigate(["/change-password"]);
          } else {
            this.router.navigate(["/"]);
          }
        }
      }
      // There is an error
      else {
        this.loginUserError(result);
      }
    } else {
      this.loginUserError(result);
    }
  }

  /**
   * Error on login user
   *
   * @param result
   */
  private loginUserError(result: any): void {
    this.setLoginFormError("Correo o contraseña erróneos");
  }

  // Sets up the login form's error
  private setLoginFormError(errorMessage: string) {
    this.loginFormError = null;
    if (errorMessage) {
      setTimeout(() => {
        this.loginFormError = errorMessage;
      });
    }
  }
}
