import { Injectable } from '@angular/core';
import { ShowProfileUserService } from '../../api/showProfileUser/showProfileUser.service';
import { ChatService } from '../chat.service';
import * as firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import jwt_decode from 'jwt-decode';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
export class StreamingService {

  eventName = this.eventSvc.eventName;

  noMsgs = false;

  constructor(
    private afs: AngularFirestore,
    private showProfileUserService: ShowProfileUserService,
    private chatService: ChatService,
    public eventSvc: EventService
  ) { }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value.trim() !== 'null' && value.trim() !== '' && value.trim() !== 'undefined') {
        return true;
      }
    }
    return false;
  }

  async createChatStreaming(msg, streamingId: string) {
    const username = await this.showProfileUserService.showProfileUser()
      .then((result) => {
        if (this.isValueNull(result.profile.username)) {
          return result.profile.username;
        } else {
          return result.profile.name;
        }
      });
    if (username) {
      const info = {
        createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
        messages: [
          {
            msg,
            from: jwt_decode(localStorage.getItem('selecteduserJWT'))['id'],
            username,
            createdAt: Date.now()
          }
        ],
        streamingId
      };
      return this.afs.doc(this.eventName + `_streamings/${streamingId}`).set(info).then(() => streamingId);
    }
  }

  async addMessageStreaming(msg, uid) {
    const username = await this.showProfileUserService.showProfileUser()
      .then((result) => {
        if (this.isValueNull(result.profile.username)) {
          return result.profile.username;
        } else {
          return result.profile.name;
        }
      });
    if (username) {
      return this.afs.collection(this.eventName + '_streamings').doc(uid).update({
        messages: firebase.default.firestore.FieldValue.arrayUnion(
          {
            msg,
            from: jwt_decode(localStorage.getItem('selecteduserJWT'))['id'],
            username,
            createdAt: Date.now()
          }
        )
      });
    }
  }

  getChatStreamingMessages(uid, content: IonContent) {
    return this.chatService.getAllChats().pipe(
      switchMap(() => {
        // tslint:disable-next-line: max-line-length
        return this.afs.collection(this.eventName + '_streamings', ref => ref.orderBy('createdAt')).doc(uid).valueChanges() as Observable<any>;
      }),
      map(chat => {
        if (content !== undefined) {
          content.scrollToBottom();
        }
        if (chat === undefined) {
          this.noMsgs = true;
          return null;
        } else {
          if (chat.messages.length === 0) {
            this.noMsgs = true;
          }
        }
        return chat.messages;
      })
    );
  }
}
