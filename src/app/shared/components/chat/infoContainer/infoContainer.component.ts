import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import jwt_decode from 'jwt-decode';
import { AlertController, IonNav, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ContextmenuChatComponent } from 'src/app/shared/pages/popovers/contextmenuChat/contextmenuChat.component';
import { AddPeopleToGroupComponent } from './pages/addPeopleToGroup/addPeopleToGroup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'info-container',
  templateUrl: './infoContainer.component.html',
  styleUrls: ['./infoContainer.component.scss'],
})
export class InfoContainerComponent implements OnInit {

  isGroup: Observable<boolean>;
  name?= sessionStorage.getItem('name');
  uid?= sessionStorage.getItem('uidChat');
  users: Observable<any[]>;

  nameGroup = '';
  id = jwt_decode(localStorage.getItem('selecteduserJWT'))['id'];
  admin: boolean;

  addPeoplePage = AddPeopleToGroupComponent;

  constructor(
    public chatService: ChatService,
    private alertCtrl: AlertController,
    public translateService: TranslateService,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController,
    private router: Router,
    public nav: IonNav
  ) { }

  ngOnInit() {
    this.nameGroup = this.name;
    this.isGroup = this.chatService.chatIsGroup(this.uid);
    this.users = this.chatService.getUsersChat(this.uid);
    this.getAdmin();
  }

  goBack() {
    this.nav.popTo(1);
  }

  saveNewNameGroup() {
    this.chatService.setNewNameGroup(this.nameGroup, this.uid).then(() => {
      console.log('nombre cambiado');
      sessionStorage.setItem('name', this.nameGroup);
    }).catch();
  }

  getAdmin() {
    this.users.subscribe(data => {
      data.forEach(user => {
        if (user.id === this.id) {
          this.admin = user.admin;
        }
      });
    });
  }

  async openPopover(selectedUser, event) {
    const popover = await this.popoverCtrl.create({
      component: ContextmenuChatComponent,
      componentProps: {
        selectedUser,
        admin: this.admin
      },
      event,
      backdropDismiss: true,
      showBackdrop: false,
      cssClass: 'contextmenu'
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data !== undefined) {
      switch (data.option) {
        case 0:
          this.router.navigate(['/menu/info/assistant/', selectedUser.id]);
          break;
        case 1:
          this.deleteUser(selectedUser.id, selectedUser.name);
          break;
        case 2:
          this.deleteAdmin(selectedUser.id, selectedUser.name);
          break;
        case 3:
          this.makeAdmin(selectedUser.id, selectedUser.name);
          break;
      }
    }
  }

  async deleteUser(id, name) {
    const title = await this.translateService.get('CHAT.remove').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('CHAT.removeUser', { name }).toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertCtrl.create({
        header: title,
        message,
        buttons: [{
          text: 'Ok',
          handler: () => { this.chatService.deleteFromGroup(id, this.uid); }
        },
        {
          text: 'Cancel'
        }]
      });

      await alert.present();
    }
  }

  async deleteAdmin(id, name) {
    const title = await this.translateService.get('CHAT.discard').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('CHAT.discardUser', { name }).toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertCtrl.create({
        header: title,
        message,
        buttons: [{
          text: 'Ok',
          handler: () => { this.chatService.deleteAdminGroup(id, this.uid); }
        },
        {
          text: 'Cancel'
        }]
      });

      await alert.present();
    }
  }

  async makeAdmin(id, name) {
    const title = await this.translateService.get('CHAT.makeAdmin').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('CHAT.makeAdminUser', { name }).toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertCtrl.create({
        header: title,
        message,
        buttons: [{
          text: 'Ok',
          handler: () => { this.chatService.setAdminGroup(id, this.uid); }
        },
        {
          text: 'Cancel'
        }]
      });

      await alert.present();
    }
  }

  async leaveGroup() {
    const title = await this.translateService.get('CHAT.leave').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('CHAT.leaveUser', { nameGroup: this.name }).toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertCtrl.create({
        header: title,
        message,
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.chatService.deleteFromGroup(this.id, this.uid);
            sessionStorage.clear();
            this.nav.popToRoot();
          }
        },
        {
          text: 'Cancel'
        }]
      });

      await alert.present();
    }
  }

  async presentToast(translation) {
    const message = await this.translateService.get(translation).toPromise()
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

  goToProfile(id) {
    if (this.id !== id) {
      console.log('PERFIL');
    }
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== 'null' && value.trim() !== '' && value !== 'undefined') {
        return true;
      }
    }
    return false;
  }
}
