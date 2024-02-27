import { Component, Input, OnInit } from '@angular/core';
import { IonNav } from '@ionic/angular';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { ConversationContainerComponent } from '../conversationContainer/conversationContainer.component';

@Component({
  selector: 'group-container',
  templateUrl: './groupContainer.component.html',
  styleUrls: ['./groupContainer.component.scss'],
})
export class GroupContainerComponent implements OnInit {

  listUsers: any = [];
  goToCreateGroup = false;
  groupName: string;

  nextPage = ConversationContainerComponent;

  constructor(
    private chatService: ChatService,
    public nav: IonNav
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.nav.popTo(0);
  }

  cancel() {
    sessionStorage.removeItem('idAssistant');
    sessionStorage.removeItem('name');
  }

  receiveChatGroup(list) {
    this.listUsers = list;
  }

  back() {
    this.listUsers = [];
    this.goToCreateGroup = false;
  }

  next() {
    this.goToCreateGroup = true;
  }

  async createGroup() {
    if (this.groupName !== undefined && this.listUsers.length !== 0 && this.groupName.trim() !== '') {
      const users = [];
      this.listUsers.forEach(user => {
        users.push(user.id);
      });
      const chatUid = await this.chatService.createChat(users, null, true, this.groupName).then(res => res);
      if (chatUid) {
        sessionStorage.setItem('uidChat', chatUid);
        sessionStorage.setItem('name', this.groupName);
        this.nav.push(this.nextPage);
      }
    }
  }

  delete(id) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = this.listUsers.length; i >= 0; i--) {
      const user = this.listUsers[i - 1];
      if (user !== undefined) {
        if (user.id === id) {
          this.listUsers.splice(i - 1, 1);
        }
      }
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
