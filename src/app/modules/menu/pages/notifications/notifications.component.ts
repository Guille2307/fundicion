import { formatDate } from "@angular/common";
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatDialog } from "@angular/material/dialog";

import { IonContent } from "@ionic/angular";
import { Observable } from "rxjs";
import { ConfirmacionComponent } from "src/app/shared/components/confirmacion/confirmacion.component";

import { NotificationsAlertService } from "src/app/shared/services/chat/notifications/notificationsAlert.service";
import { PermissionsService } from "src/app/shared/services/permissions/permissions.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  messages: Observable<any[]>;
  newMsg = "";

  date?;

  constructor(
    public permissionsSvc: PermissionsService,
    public notificationsAlertSvc: NotificationsAlertService,
    private afs: AngularFirestore,
    public dialog: MatDialog,

    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.messages = this.notificationsAlertSvc.getChatNotifications(
      this.content
    );
  }

  sendMessage() {
    if (this.permissionsSvc.getPermissions().crearNotificacionesGlobal) {
      if (this.newMsg.trim() !== "") {
        this.notificationsAlertSvc
          .addChatMessageNotifications(this.newMsg)
          .then(() => {
            this.newMsg = "";
            this.content.scrollToBottom();
            this.messages = this.notificationsAlertSvc.getChatNotifications(
              this.content
            );
          });
      }
    }
  }

  showDate(date, i) {
    if (new Date(date).getDate() !== this.date || i === 0) {
      this.date = new Date(date).getDate();
      return true;
    }
    return false;
  }

  setDate(date) {
    const today =
      new Date().getDate() +
      "" +
      new Date().getMonth() +
      "" +
      new Date().getFullYear();
    const yesterday = this.getYesterday();
    const day =
      new Date(date).getDate() +
      "" +
      new Date(date).getMonth() +
      "" +
      new Date(date).getFullYear();
    if (yesterday === day) {
      return "CHAT.yesterday";
    } else if (today !== day) {
      return formatDate(new Date(date), "EEE dd MMM", this.locale);
    } else if (today === day) {
      return "CHAT.today";
    }
  }

  getYesterday() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.toDateString();
    return (
      new Date(yesterday).getDate() +
      "" +
      new Date(yesterday).getMonth() +
      "" +
      new Date(yesterday).getFullYear()
    );
  }
  delete() {
    const diolog = this.dialog.open(ConfirmacionComponent, {
      width: "450px",
      data: this.messages,
    });

    diolog.afterClosed().subscribe((result) => {
      if (result) {
        this.notificationsAlertSvc.deleteNotification();
      }
    });
  }
}
