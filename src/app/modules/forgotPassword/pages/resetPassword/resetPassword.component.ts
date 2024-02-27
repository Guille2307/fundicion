import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { ChangePasswordService } from 'src/app/shared/services/api/changePassword/changePassword.service';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';

@Component({
  selector: 'reset-password',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  forgotPass = true;

  constructor(
    private navCtrl: NavController,
    public permissionsSvc: PermissionsService,
    private activatedRoute: ActivatedRoute,
    private changePassService: ChangePasswordService,
    public translateService: TranslateService,
    public alertController: AlertController,
  ) { }

  ngOnInit() { }

  openAlert(ev) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.changePassService.changePasswordUserUrl(params.email, params.id, params.token, ev)
        .then((result) => this.changePasswordUserSuccess(result), (result) => this.changePasswordUserError(result));
    });
  }

  /**
   * Success on change password
   *
   * @param result
   */
  private changePasswordUserSuccess(result: any): void {
    if (!result.error) {
      // There is no error
      this.presentAlert(true);
    } else {
      this.changePasswordUserError(result);
    }
  }

  /**
   * Error on change password
   *
   * @param result
   */
  private changePasswordUserError(result: any): void {
    this.presentAlert(false, result.message);
  }

  async presentAlert(noError: boolean, error = '') {
    let title = await lastValueFrom(this.translateService.get('CHANGE_PASS.alert.error.title')).then((value) => value);
    let message = await lastValueFrom(this.translateService.get('CHANGE_PASS.alert.error.message')).then((value) => value);
    if (noError) {
      title = await lastValueFrom(this.translateService.get('CHANGE_PASS.alert.success.title')).then((value) => value);
      message = await lastValueFrom(this.translateService.get('CHANGE_PASS.alert.success.message')).then((value) => value);
    }

    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message: noError ? message: message + '\n\t' + error ,
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.navCtrl.navigateRoot('/login/account');
          }
        }]
      });

      await alert.present();
    }
  }
}
