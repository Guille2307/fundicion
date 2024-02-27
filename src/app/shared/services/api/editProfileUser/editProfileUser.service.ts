import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class EditProfileUserService {

  url = localStorage.getItem('API_URL');

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    public translateService: TranslateService
  ) { }

  /**
   * Edit user
   *
   * @param user
   */
  public editProfileUser(user: any): any {
    return this.http.post(this.url + '/congress/profile',
      JSON.stringify(user),
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise()
      .then((result) => this.editProfileUserSuccess(result), (result) => this.editProfileUserError(result));
  }

  /**
   * Success on editUser
   *
   * @param result
   */
  private editProfileUserSuccess(result: any): any {
    if (result.error === false) {
      return result;
    }

    return this.editProfileUserError(result);
  }

  /**
   * Error on editUser
   *
   * @param result
   */
  private editProfileUserError(result: any): any {
    this.presentAlertError(result.error.errorType);
    return null;
  }

  async presentAlertError(errorType) {
    const title = await this.translateService.get('EDIT_PROFILE.alert.error.title').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('EDIT_PROFILE.alert.error.message').toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message: message + ' <br>(' + errorType + ')',
        buttons: ['Ok']
      });

      await alert.present();
    }
  }
}
