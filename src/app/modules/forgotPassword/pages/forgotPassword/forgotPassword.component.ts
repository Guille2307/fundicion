import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { ChangePasswordService } from 'src/app/shared/services/api/changePassword/changePassword.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  public emailForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    public permissionsSvc: PermissionsService,
    private changePassService: ChangePasswordService,
    public translateService: TranslateService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  /**
   * Submits the email form
   */
  sendEmail() {
    if (!this.isFormDisabled()) {
      this.changePassService.resetPasswordUser(this.emailForm.value.email)
        .then((result) => this.checkEmailUserSuccess(result), (result) => this.checkEmailUserError(result));
    }
  }

  /**
   * Checks if the form is valid
   */
   public isFormDisabled(): boolean {
    return !this.emailForm.valid;
  }

  /**
   * Success on change password
   *
   * @param result
   */
  private checkEmailUserSuccess(result: any): void {
    if (!result.error) {
      // There is no error
      this.presentAlert();
    } else {
      this.checkEmailUserError(result);
    }
  }

  /**
   * Error on change password
   *
   * @param result
   */
  private checkEmailUserError(result: any): void {
    this.presentAlert();
  }

  async presentAlert() {
    let title = await lastValueFrom(this.translateService.get('CHANGE_PASS.forgot.alert.title')).then((value) => value);
    let message = await lastValueFrom(this.translateService.get('CHANGE_PASS.forgot.alert.message')).then((value) => value);

    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message,
        buttons: [{
          text: 'Ok'
        }]
      });

      await alert.present();
    }
  }
}
