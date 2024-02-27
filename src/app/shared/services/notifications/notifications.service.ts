import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChatService } from '../chat/chat.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public url = 'https://fcm.googleapis.com/fcm/send';
  private key = 'AAAAYPN13Yc:APA91bEjxh7oZYd5ur1VxfQdBU6xxY3YmP9q_3QuTWUTmReopTnEc-glosQRIphooIPRCtC8wuBtNbFnlDtE7HpFS4N3ETtiV7BuB1JQG4IL91garynfQDXr2Fd_aR16hBjTstUEWzf1';

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private chatSvc: ChatService
  ) { }

  async sendNotificationMsg(otherUserId, body, chatUid) {
    const token = await this.chatSvc.getNameUserForGroup(otherUserId).then(res => {
      return res.token;
    });

    const userId = jwt_decode(localStorage.getItem('selecteduserJWT'))['id'];
    // tslint:disable-next-line: max-line-length
    const title = jwt_decode(localStorage.getItem('selecteduserJWT'))['name'] + ' ' + jwt_decode(localStorage.getItem('selecteduserJWT'))['surnames'];

    if (token) {
      const json = `{
        "notification": {
            "title": "` + title + `",
            "body": "` + body + `",
            "icon": "https://congress-wtk.s3-eu-west-1.amazonaws.com/profile/` + userId + `.jpg",
            "click_action": "/menu/chats"
        },
        "data": {
            "uidChat": "` + chatUid + `",
            "idAssistant": "` + userId + `",
            "name": "` + title + `"
        },
        "to": "` + token + `"
      }`;
      // console.log(json);
      this.http.post(this.url, json, {
        headers: new HttpHeaders({
          Authorization: 'key=' + this.key,
          'content-Type': 'application/json'
        })
      }).toPromise().then(
        res => {
          console.log(res);
        }
      ).catch(
        err => {
          console.log(err);
        }
      );
    }
  }

  async sendNotificationStart(userId, activityId, speakerId, title, body) {
    const token = await this.chatSvc.getNameUserForGroup(userId).then(res => {
      return res.token;
    });

    if (token) {
      const json = `{
        "notification": {
            "title": "` + title + `",
            "body": "` + body + `",
            "icon": "https://congress-wtk.s3-eu-west-1.amazonaws.com/profile/` + speakerId + `.jpg",
            "click_action": "/menu/activity/` + activityId + `"
        },
        "to": "` + token + `"
      }`;

      this.http.post(this.url, json, {
        headers: new HttpHeaders({
          'Authorization': 'key=' + this.key,
          'Content-Type': 'application/json'
        })
      }).toPromise().then(
        res => {
          console.log(res);
        }
      ).catch(
        err => {
          console.log(err);
        }
      );
    }
  }

  sendNotificationToAll(msg) {
    const tokens = [];
    this.chatSvc.assistants.forEach(user => {
      this.chatSvc.getNameUserForGroup(user.id).then(res => {
        if (res !== undefined) {
          if (res.token !== null && res.token !== '')
            tokens.push(res.token);
        }
      });
    });
    if (tokens) {
      setTimeout(() => {
        const json = `{
        "notification": {
            "title": "` + `",
            "body": "` + msg + `",
            "click_action": "/menu/notifications"
        },
        "data": {
          "message": "` + msg + `"
        }
        "registration_ids": ` + JSON.stringify(tokens) + `
      }`;
        // console.log(json);
        this.http.post(this.url, json, {
          headers: new HttpHeaders({
            Authorization: 'key=' + this.key,
            'content-Type': 'application/json'
          })
        }).toPromise().then(
          res => {
            console.log(res);
          }
        ).catch(
          err => {
            console.log(err);
          }
        );
      }, 4000)
    }
  }
}
