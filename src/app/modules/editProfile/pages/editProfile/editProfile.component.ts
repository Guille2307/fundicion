import { AfterViewChecked, AfterViewInit, Component, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { EditProfileUserService } from 'src/app/shared/services/api/editProfileUser/editProfileUser.service';
import { AlertController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ShowProfileUserService } from 'src/app/shared/services/api/showProfileUser/showProfileUser.service';
import { filter } from 'rxjs/operators';
import { ImageProfilePipe } from 'src/app/shared/pipes/imageProfile/imageProfile.pipe';
import { SendImageService } from 'src/app/shared/services/api/sendImage/sendImage.service';
import jwt_decode from 'jwt-decode';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { UserLoginService } from 'src/app/shared/services/api/loginUser/loginUser.service';
import { SendFileService } from 'src/app/shared/services/api/sendFile/sendFile.service';
import { SetNewPasswordComponent } from 'src/app/shared/pages/popovers/setNewPassword/setNewPassword.component';
import { CropperImgComponent } from 'src/app/shared/pages/popovers/cropperImg/cropperImg.component';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnChanges {

  // Class variables
  user: any = {};

  imgSelector;
  fileSelector;

  userId = jwt_decode(localStorage.getItem('selecteduserJWT'))['id'];

  imgProfile?;
  filesProfile?= [];
  files = [];

  sub = jwt_decode(localStorage.getItem('selecteduserJWT'))['sub'];

  showAttachedFiles = true;

  showTooltip = false;

  filesToDelete = [];

  public form: FormGroup;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    public editProfileUserService: EditProfileUserService,
    private showProfileUserSvc: ShowProfileUserService,
    public alertController: AlertController,
    public translateService: TranslateService,
    public navCtrl: NavController,
    public sendImageService: SendImageService,
    public chatService: ChatService,
    public userLoginService: UserLoginService,
    public sendFileService: SendFileService,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController,
    @Inject(DOCUMENT) private document: Document,
    public permissionsSvc: PermissionsService,
    public profileSvc: ProfileService
  ) {
  }

  ngOnInit() {
    this.getUser();
    this.form = this.profileSvc.getForm();

    // const textarea = document.querySelector('textarea');
    // textarea.addEventListener('keydown', this.textareaAutosize);

    // const infoContainer = document.getElementById('info-container');
    // infoContainer.addEventListener('keydown', this.textareaAutosize);
  }

  async getUser() {
    this.user = await this.showProfileUserSvc.showProfileUser().then((result) => {
      return result.profile;
    }).catch((err) => {
      return err;
    });

    if (this.user) {
      this.form = this.profileSvc.setDataForm(this.user);
      this.getFiles();
      this.imgAndFileSelectors();
    }
  }

  getSub(subs) {
    if (subs.length === 0) {
      return true;
    }
    let flag = false;
    subs.forEach(sub => {
      if (sub === this.sub) {
        flag = true;
      }
    });
    return flag;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user.currentValue) {
      if (this.user && localStorage.getItem('selecteduserJWT') !== null) {
        this.setImages();
      }
    }
  }

  imgAndFileSelectors() {
    this.setImages();

    this.fileSelector = document.getElementById('file-selector');
    if (this.fileSelector) {
      this.fileSelector.addEventListener('change', (event) => {
        this.filesProfile = Array.from(event.target.files);
      });
    }
  }

  setImgProfile() {
    if (this.imgProfile !== null && this.imgProfile !== undefined) {
      this.sendImageService.uploadPicture(this.imgProfile)
        .then((result) => {
          console.log(result.sendFile);
        }).catch((err) => {
          console.log(err.sendFile);
        });
    }
  }

  setFilesProfile() {
    if (this.filesProfile.length !== 0) {
      this.filesProfile.forEach(file => {
        this.sendFileService.uploadFile(file, 'profile')
          .then((result) => {
            console.log(result);
          }).catch((err) => {
            console.log(err);
          });
      });
    }
  }

  async getFiles() {
    this.files = await this.sendFileService.getFilesUser().then(value => value);
  }

  setImages() {
    const imgProfilePipe = new ImageProfilePipe();
    const imgContainer = document.getElementById('img-container-edit');
    if (imgContainer) {
      imgContainer.style.background = 'url("' + imgProfilePipe.transform(this.userId) + '") no-repeat center center / cover';
    }
  }

  /**
   * Checks if the form is valid
   */
  public isEditDisabled(): boolean {
    return this.form.valid;
  }

  goBack() {
    this.location.back();
  }

  textareaAutosize() {
    const el: any = this;
    setTimeout(() => {
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
  }

  saveProfile() {
    if (this.isEditDisabled()) {
      try {
        const chatUser = {
          email: this.form.value.email,
          idAssistant: jwt_decode(localStorage.getItem('selecteduserJWT'))['id'],
          name: this.form.value.name + ' ' + this.form.value.surnames
        };
        this.chatService.signIn(chatUser);
      } catch (e) { }
      this.setFilesProfile();
      this.setImgProfile();
      Object.keys(this.form.value.permission).forEach(key => {
        if (this.form.value.permission[key] === null) {
          this.form.value.permission[key] = true;
        }
      });
      this.editProfileUserService.editProfileUser(this.form.value)
        .then((result) => this.editProfileUserSuccess(result), (result) => this.editProfileUserError(result));
    } else {
      this.showTooltip = true;
    }
  }

  /**
   * Success on login user
   *
   * @param result
   */
  private editProfileUserSuccess(result: any): void {
    if (result !== null) {
      this.filesToDelete.forEach(file => {
        this.sendFileService.deleteFile(file.id).then((result) => {
          console.log(result);
        }).catch((err) => {
          console.log(err);
        });
      });
      this.navCtrl.navigateRoot('/menu/profile/my-info');
      this.presentAlertSuccess();
    } else {
      this.editProfileUserError(result);
    }
  }

  /**
   * Error on login user
   *
   * @param result
   */
  private editProfileUserError(result: any): void {
    console.log('ERROR');
  }

  getBoolCommercial(bool) {
    if (bool === '') {
      return false;
    }
    return true;
  }

  getDataToShow(value) {
    if (value !== null && value !== undefined) {
      if (value.trim() !== 'null' && value.trim() !== '' && value.trim() !== 'undefined') {
        return value;
      }
    }
    return '';
  }

  editNameAndLastname() {
    const inputName = (document.getElementById('name') as HTMLInputElement);
    const inputLastname = (document.getElementById('surnames') as HTMLInputElement);

    if (inputName.hasAttribute('readonly') && inputLastname.hasAttribute('readonly')) {
      inputName.removeAttribute('readonly');
      inputLastname.removeAttribute('readonly');
    } else {
      inputName.setAttribute('readonly', '');
      inputLastname.setAttribute('readonly', '');
    }
  }

  async presentAlertSuccess() {
    const title = await this.translateService.get('EDIT_PROFILE.alert.success.title').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('EDIT_PROFILE.alert.success.message').toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message,
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.deleteOldCaches().then(() => this.document.defaultView.location.reload());
          }
        }]
      });

      await alert.present();
    }
  }

  async deleteOldCaches() {
    const keys = await caches.keys();

    for (const key of keys) {
      caches.delete(key);
    }
  }

  addImage(ev) {
    this.presentAlertImage(ev);
  }


  addFile() {
    this.fileSelector.click();
  }

  setDocName(name) {
    let finalName = '';
    for (let i = 11; i < name.length; i++) {
      finalName += name[i];
    }
    return finalName;
  }

  deleteProfileFile(i) {
    this.filesProfile.splice(i, 1);
  }

  deleteFile(file, i) {
    this.files.splice(i, 1);
    this.filesToDelete.push(file);
  }

  async presentToast(toggle, label) {
    const field = await this.translateService.get(label).toPromise()
      .then((res) => {
        return res;
      });
    if (field) {
      const parameter = { field };
      let msg = 'EDIT_PROFILE.toastPublic';
      if (toggle) {
        msg = 'EDIT_PROFILE.toastPrivate';
      }
      const message = await this.translateService.get(msg, parameter).toPromise()
        .then((res) => {
          return res;
        });
      if (message) {
        const toast = await this.toastCtrl.create({
          message,
          duration: 2000
        });
        toast.present();
      }
    }
  }

  async presentAlertImage(ev) {
    const title = await this.translateService.get('EDIT_PROFILE.alertImage.title').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('EDIT_PROFILE.alertImage.message').toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message,
        buttons: [{
          text: 'Ok',
          handler: () => {
            // this.imgSelector.click();
            this.goToCropperImg(ev);
          }
        }]
      });

      await alert.present();
    }
  }

  async goToChangePass() {
    const popover = await this.popoverCtrl.create({
      component: SetNewPasswordComponent,
      cssClass: 'set-new-password',
      backdropDismiss: false,
      // event: ev,
      translucent: true
    });
    await popover.present();
  }

  async goToCropperImg(ev) {
    const popover = await this.popoverCtrl.create({
      component: CropperImgComponent,
      cssClass: 'cropper-img-popover',
      backdropDismiss: false,
      event: ev,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (data) {
      const base64String = data.base64String;
      const base64 = await fetch('data:image/jpg;base64,' + base64String.replace("data:", "").replace(/^.+,/, ""));
      const blob = await base64.blob();
      if (blob) {
        this.imgProfile = blob;
      }
      const img: any = document.getElementById('img-profile');
      img.src = base64String;
      const imgContainer = document.getElementById('img-container-edit');
      if (imgContainer) {
        imgContainer.style.background = 'url("' + base64String + '") no-repeat center center / cover';
      }
    }
  }
}
