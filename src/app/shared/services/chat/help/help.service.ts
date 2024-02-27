import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ShowProfileUserService } from '../../api/showProfileUser/showProfileUser.service';
import { ChatService } from '../chat.service';
import * as firebase from 'firebase/compat/app';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IonContent } from '@ionic/angular';
import { EventService } from '../../event/event.service';

export interface Message {
  createdAt: firebase.default.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  eventName = this.eventSvc.eventName;

  constructor(
    private afs: AngularFirestore,
    private showProfileUserService: ShowProfileUserService,
    private chatService: ChatService,
    public eventSvc: EventService
  ) { }

  async addChatMessageHelp(msg) {
    const username = await this.showProfileUserService.showProfileUser()
      .then((result) => {
        if (this.isValueNull(result.profile.username)) {
          return result.profile.username;
        } else {
          return result.profile.name;
        }
      });
    if (username) {
      return this.afs.collection(this.eventName + '_chat_help').add({
        msg,
        from: this.chatService.currentUser.idAssistant,
        createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
        username
      });
    } else {
      return this.afs.collection(this.eventName + '_chat_help').add({
        msg,
        from: this.chatService.currentUser.idAssistant,
        createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
        username: jwt_decode(localStorage.getItem('selecteduserJWT'))['name']
      });
    }

  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value.trim() !== 'null' && value.trim() !== '' && value.trim() !== 'undefined') {
        return true;
      }
    }
    return false;
  }

  getChatHelp(content: IonContent) {
    let users = [];
    let currentUserIdAssistant;

    return this.chatService.getUsers().pipe(
      switchMap(res => {
        users = res;
        if (this.chatService.currentUser === null) {
          currentUserIdAssistant = jwt_decode(localStorage.getItem('selecteduserJWT'))['id'];
        } else {
          currentUserIdAssistant = this.chatService.currentUser.idAssistant;
        }
        // tslint:disable-next-line: max-line-length
        return this.afs.collection(this.eventName + '_chat_help', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map(messages => {
        for (const m of messages) {
          m.fromName = this.chatService.getUserForMsg(m.from, users);
          m.myMsg = currentUserIdAssistant === m.from;
        }
        if (content !== undefined) {
          content.scrollToBottom();
        }
        return messages;
      })
    );
  }
}
