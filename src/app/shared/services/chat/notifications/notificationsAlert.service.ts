import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ChatService } from "../chat.service";
import * as firebase from "firebase/compat/app";
import jwt_decode from "jwt-decode";
import { IonContent } from "@ionic/angular";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { NotificationsService } from "../../notifications/notifications.service";

export interface Message {
  createdAt: firebase.default.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

export interface Chat {
  createdAt: firebase.default.firestore.FieldValue;
  isGroup: boolean;
  messages: [];
  uid: string;
  users: [];
}

@Injectable({
  providedIn: "root",
})
export class NotificationsAlertService {
  eventId = localStorage.getItem("eventId");

  constructor(
    private afs: AngularFirestore,
    private chatSvc: ChatService,
    public notificationsSvc: NotificationsService
  ) {}

  async addChatMessageNotifications(msg) {
    const message = {
      msg,
      from: this.chatSvc.currentUser.idAssistant,
      username: jwt_decode(localStorage.getItem("selecteduserJWT"))["name"],
      createdAt: Date.now(),
    };
    return this.afs
      .collection("chat_notifications")
      .doc(this.eventId)
      .update({
        messages: firebase.default.firestore.FieldValue.arrayUnion(message),
      })
      .then(() => {
        this.notificationsSvc.sendNotificationToAll(msg);
      })
      .catch(() => {
        const info = {
          createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
          createdBy: this.chatSvc.currentUser.idAssistant,
          uid: this.eventId,
          messages: [message],
        };
        return this.afs
          .doc(`chat_notifications/${this.eventId}`)
          .set(info)
          .then(() => this.eventId)
          .then(() => {
            this.notificationsSvc.sendNotificationToAll(msg);
          });
      });
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (
        value.trim() !== "null" &&
        value.trim() !== "" &&
        value.trim() !== "undefined"
      ) {
        return true;
      }
    }
    return false;
  }

  getAllChats() {
    return this.afs
      .collection("chat_notifications")
      .valueChanges({ idField: "uid" }) as Observable<Chat[]>;
  }

  getChatNotifications(content: IonContent) {
    return this.getAllChats().pipe(
      switchMap(() => {
        return this.afs
          .collection("chat_notifications", (ref) => ref.orderBy("createdAt"))
          .doc(this.eventId)
          .valueChanges() as Observable<any>;
      }),
      map((chat) => {
        if (content !== undefined) {
          content.scrollToBottom();
        }
        if (chat !== undefined) {
          return chat.messages;
        }
      })
    );
  }
  deleteNotification() {
    return this.afs.collection("chat_notifications").doc(this.eventId).delete();
  }
}
