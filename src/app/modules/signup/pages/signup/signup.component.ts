import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users/users.service';
import jwt_decode from 'jwt-decode';
import { RegisterUserService } from 'src/app/shared/services/api/registerUser/registerUser.service';
import { UserLoginService } from 'src/app/shared/services/api/loginUser/loginUser.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EditProfileUserService } from 'src/app/shared/services/api/editProfileUser/editProfileUser.service';
import { SendImageService } from 'src/app/shared/services/api/sendImage/sendImage.service';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private registerUserService: RegisterUserService,
    private loginUserService: UserLoginService,
    public alertController: AlertController,
    public translateService: TranslateService,
    public editProfileUserService: EditProfileUserService,
    public sendImageService: SendImageService,
    public permissionsSvc: PermissionsService
  ) { }

  // Class variables
  public createAccountForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    surnames: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repPassword: ['', [Validators.required]],
    remember: [false],
    readPolitics: [false, [Validators.required, SignupComponent.mustBeTrue]],
    acceptCommunications: [false]
  },
    {
      validators: this.checkPassword
    });

  public showPass = false;
  public showRepPass = false;

  fileSelector;

  showTooltip = false;

  static mustBeTrue(c: AbstractControl): { [key: string]: boolean } {
    const rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
  }

  ngOnInit() {
    // this.fileSelector = document.getElementById('file-selector');
    // this.fileSelector.addEventListener('change', (event) => {
    //   const file = event.target['files'][0];
    //   console.log(file);
    //   const fr = new FileReader();
    //   fr.onload = (theFile) => {
    //     return (e) => {
    //       const imgProfile = document.getElementById('img-profile') as any;
    //       imgProfile.src = e.target.result;
    //     };
    //   };
    //   fr.readAsDataURL(event.target['files'][0]);
    // });
  }

  /**
   * Checks if the form is valid
   */
  public isRegisterDisabled(): boolean {
    return this.createAccountForm.valid;
  }

  goBack() {
    this.location.back();
  }

  createAccount() {
    if (this.isRegisterDisabled()) {
      this.registerUserService.registerUser(this.createAccountForm.value)
        .then((result) => this.registerUserSuccess(result), (result) => this.registerUserError(result));
    } else {
      this.showTooltip = true;
    }
  }

  /**
   * Success on login user
   *
   * @param result
   */
  async registerUserSuccess(result: any): Promise<void> {
    if (result !== null) {
      this.presentAlertSuccess();
      // console.log(this.createAccountForm.value);
      // tslint:disable-next-line: max-line-length
      const token = await this.loginUserService.loginUserNewAccount(this.createAccountForm.value.email, this.createAccountForm.value.password).then((value) => {
        return value.token;
      }).catch((err) => {
        console.log('ERROR', err);
      });

      if (token) {
        this.router.navigate(['/edit-profile']);
      }

      // // There is no error
      // if (jwt_decode(result['token']).token !== null) {
      //   this.usersService.saveUserJWT(result.token, this.createAccountForm.value.username, this.createAccountForm.value.remember);
      //   this.router.navigate(['/']);
      // }
      // // There is an error
      // else {
      //   this.registerUserError(result);
      // }
    } else {
      this.registerUserError(result);
    }
  }

  /**
   * Error on login user
   *
   * @param result
   */
  private registerUserError(result: any): void {
    console.log('ERROR');
  }

  checkPassword(c: AbstractControl) {
    if (c.get('password').value !== c.get('repPassword').value || c.get('password').value.length < 6) {
      return { invalid: true };
    }
  }

  addImage() {
    this.fileSelector.click();
  }

  goToPoliciesPrivacy() {
    this.router.navigate(['/legal-info/policies-privacy']);
  }

  showHidePass(id) {
    if (id === 1) {
      const inputPass = document.getElementById('password');
      if (inputPass['type'] === 'password') {
        inputPass['type'] = 'text';
      } else {
        inputPass['type'] = 'password';
      }
      this.showPass = !this.showPass;
    } else if (id === 2) {
      const inputPass = document.getElementById('repPassword');
      if (inputPass['type'] === 'password') {
        inputPass['type'] = 'text';
      } else {
        inputPass['type'] = 'password';
      }
      this.showRepPass = !this.showRepPass;
    }
  }

  async presentAlertSuccess() {
    const title = await this.translateService.get('CREATE_ACCOUNT.alert.success.title').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('CREATE_ACCOUNT.alert.success.message').toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message,
        buttons: ['Ok']
      });

      await alert.present();
    }
  }
}
