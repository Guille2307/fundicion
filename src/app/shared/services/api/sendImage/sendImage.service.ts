import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SendImageService {

  url = localStorage.getItem('API_URL');

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    public translateService: TranslateService,
  ) { }

  public uploadPicture(image: any): any {
    const formData = new FormData();
    formData.append('photo', image);
    return this.http.post(this.url + '/congress/sendfile',
      formData,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise()
      .then((result) => this.uploadPictureSuccess(result), (result) => this.uploadPictureError(result));
  }
  
  public uploadSchedulePicture(scheduleId: any, image: any): any {
    const formData = new FormData(); 
    formData.append('Schedule_id', scheduleId);
    formData.append('image', image);
    return this.http.post(this.url + '/congress/uploadscheduleimage',
      formData,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise()
      .then((result) => result);
  }

  uploadPictureSuccess(result: any): any {
    return result;
  }

  uploadPictureError(result: any): any {
    return result;
  }

  async presentAlertSuccess() {
    const title = await this.translateService.get('UPLOAD_IMG.alert.success.title').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('UPLOAD_IMG.alert.success.message').toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message,
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  async presentAlertError(errorType) {
    const title = await this.translateService.get('UPLOAD_IMG.alert.error.title').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('UPLOAD_IMG.alert.error.message').toPromise()
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
