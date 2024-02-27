import { Component, OnInit } from '@angular/core';
import { IonNav } from '@ionic/angular';
import { ChatService } from 'src/app/shared/services/chat/chat.service';

@Component({
  selector: 'add-people-to-group',
  templateUrl: './addPeopleToGroup.component.html',
  styleUrls: ['./addPeopleToGroup.component.scss'],
})
export class AddPeopleToGroupComponent implements OnInit {

  listUsers: any = [];

  constructor(
    public nav: IonNav,
    public chatService: ChatService,
  ) { }

  ngOnInit() { }

  receiveUsers(ev) {
    this.listUsers = ev;
  }

  addPeople() {
    const uid = sessionStorage.getItem('uidChat');
    if (uid !== undefined && uid !== null) {
      this.listUsers.forEach(user => {
        this.chatService.addToGroup(user.id, uid);
      });
    }
    this.nav.pop();
  }
}
