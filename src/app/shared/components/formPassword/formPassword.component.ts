import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ChangePasswordService } from '../../services/api/changePassword/changePassword.service';
import { ChatService } from '../../services/chat/chat.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'form-password',
  templateUrl: './formPassword.component.html',
  styleUrls: ['./formPassword.component.scss'],
})
export class FormPasswordComponent implements OnInit {

  // Class variables
  @Input() isPopover = false;
  @Input() forgotPass = false;
  public passForm: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
    repPassword: ['', [Validators.required]]
  },
    {
      validators: this.checkPassword
    });

  public showPass = false;
  public showRepPass = false;

  @Output() sendEvent = new EventEmitter<any>();

  constructor(
    private location: Location,
    private fb: FormBuilder,
    public alertController: AlertController,
    public translateService: TranslateService,
    private changePassService: ChangePasswordService,
    public chatService: ChatService,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() { }

  checkPassword(c: AbstractControl) {
    if (c.get('password').value !== c.get('repPassword').value) {
      return {
        invalid: true,
        text: 'CHANGE_PASS.toastDifferentPass'
      };
    }
      if ( c.get('password').value.length < 6) {
      return {
        invalid: true,
        text: 'CHANGE_PASS.toastLength'
      };
    }
  }

  showHidePass() {
    const inputPass = document.getElementById('newpassword');
    if (inputPass['type'] === 'password') {
      inputPass['type'] = 'text';
    } else {
      inputPass['type'] = 'password';
    }
    this.showPass = !this.showPass;
  }

  showHideRepPass() {
    const inputPass = document.getElementById('repPassword');
    if (inputPass['type'] === 'password') {
      inputPass['type'] = 'text';
    } else {
      inputPass['type'] = 'password';
    }
    this.showRepPass = !this.showRepPass;
  }

  /**
   * Checks if the form is valid
   */
  public isFormValid(): boolean {
    return this.passForm.valid;
  }

  /**
   * Submits the password form
   */
  public async changePass(): Promise<void> {
    if (this.isFormValid()) {
      if (this.forgotPass) {
        this.sendEvent.emit(this.passForm.value.password);
      } else {
        this.changePassService.changePasswordUser(this.passForm.value.password)
          .then((result) => this.changePasswordUserSuccess(result), (result) => this.changePasswordUserError(result));
      }
    } else {
      const message = await lastValueFrom(this.translateService.get(this.passForm.errors.text)).then((res) => res);
      if (message) {
        const toast = await this.toastCtrl.create({
          message,
          duration: 2000
        });
        toast.present();
      }
    }
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
    this.presentAlert(false);
  }

  async presentAlert(noError: boolean) {
    let title = await lastValueFrom(this.translateService.get('CHANGE_PASS.alert.error.title')).then((value) => value);
    let message = await lastValueFrom(this.translateService.get('CHANGE_PASS.alert.error.message')).then((value) => value);
  
    if (noError) {
      title = await lastValueFrom(this.translateService.get('CHANGE_PASS.alert.success.title')).then((value) => value);
      message = await lastValueFrom(this.translateService.get('CHANGE_PASS.alert.success.message')).then((value) => value);
    }

    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message,
        buttons: [{
          text: 'Ok',
          handler: () => this.sendEvent.emit()
        }]
      });

      await alert.present();
    }
  }

  goBack() {
    this.sendEvent.emit();
  }
}
