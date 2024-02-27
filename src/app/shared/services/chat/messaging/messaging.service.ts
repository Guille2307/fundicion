import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo, tap } from 'rxjs/operators';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import jwt_decode from 'jwt-decode';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { EventService } from '../../event/event.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  eventName = this.eventSvc.eventName;

  token = null;

  public url = 'https://caapi.woutick.es';

  public thereAreNotifications = false;

  constructor(
    private afs: AngularFirestore,
    private afMessaging: AngularFireMessaging,
    private toastCtrl: ToastController,
    public translateSvc: TranslateService,
    private router: Router,
    public platform: Platform,
    private http: HttpClient,
    public eventSvc: EventService
  ) { }

  public requestPermission() {
    if (Capacitor.getPlatform() === 'web') {
      this.afMessaging.requestToken.subscribe({
        next: (token) => {
          this.saveToken(token);
          this.setTokenNotifications(token).then(res => console.log(res));
        },
        error: (err) => {
          console.log('Error: ', err);
        },
        complete: () => this.getNotifications()
      });
    } else {
      this.registerPushCapacitor();
    }
  }

  removeNotifications() {
    if (Capacitor.getPlatform() !== 'web') {
      PushNotifications.removeAllDeliveredNotifications();
    }
  }

  private registerPushCapacitor() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        // alert('Push registration success, token: ' + token.value);
        this.saveToken(token.value);
        this.setTokenNotifications(token.value).then(res => console.log(res));
        console.log('Mi token: ' + JSON.stringify(token.value));
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        // alert('Error on registration: ' + JSON.stringify(error));
        console.log('Error: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // alert('Push received: ' + JSON.stringify(notification));
        console.log('Mi token: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // this.navCtrl.navigateRoot('/notificaciones');
        console.log('Push action performed: ' + JSON.stringify(notification.notification));
        // alert('Push action performed: ' + JSON.stringify(notification.notification));
      }
    );
  }

  public setTokenNotifications(token): any {
    const json = `{
      "token": "` + token + `"
    }`;
    return lastValueFrom(this.http.post(this.url + '/congress/token',
      json,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      })).then((result) => result);
  }

  saveToken(token) {
    const idUser = jwt_decode(localStorage.getItem('selecteduserJWT'))['id'];
    this.afs.collection(this.eventName + '_users').doc(idUser).update({
      token
    });
  }

  deleteToken() {
    const idUser = jwt_decode(localStorage.getItem('selecteduserJWT'))['id'];
    if (idUser !== null && idUser !== undefined) {
      this.afs.collection(this.eventName + '_users').doc(idUser).update({
        token: ''
      });
    }
  }

  // async deleteToken() {
  //   if (this.token) {
  //     this.afMessaging.deleteToken(this.token);
  //     this.token = null;
  //     const toast = await this.toastCtrl.create({
  //       message: 'Token removed',
  //       duration: 2000
  //     });
  //     toast.present();
  //   }
  // }

  async showToast(notification) {
    const header = await lastValueFrom(this.translateSvc.get('NOTIFICATIONS.title')).then(res => res);
    const text = await lastValueFrom(this.translateSvc.get('NOTIFICATIONS.go')).then(res => res);
    if (header && text) {
      if (notification.data.message) {
        this.thereAreNotifications = true;
      }
      const uidChat = sessionStorage.getItem('uidChat');
      if (notification.data.message || notification.data.uidChat !== uidChat) {
        let message = notification.notification.title + ': ' + notification.notification.body;
        if (notification.notification.title === '') {
          message = notification.notification.body;
        }
        const toast = await this.toastCtrl.create({
          header,
          message,
          translucent: true,
          position: 'top',
          duration: 3500,
          buttons: [
            {
              text,
              handler: () => {
                this.router.navigate([notification.click_action]);
              }
            }
          ]
        });

        await toast.present();
      }
    }
  }

  getNotifications() {
    this.afMessaging.messages.subscribe((msg: any) => {
      this.showToast(msg);
    });
  }
}
