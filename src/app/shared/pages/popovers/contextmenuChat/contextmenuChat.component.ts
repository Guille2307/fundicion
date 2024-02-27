import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'contextmenu-chat',
  templateUrl: './contextmenuChat.component.html',
  styleUrls: ['./contextmenuChat.component.scss'],
})
export class ContextmenuChatComponent implements OnInit {

  @Input() selectedUser;
  @Input() admin;

  contextmenuOptions = [
    {
      name: 'CHAT.contextmenu.showProfile',
      isAdmin: false,
      needAdmin: false,
      action: 0
    },
    {
      name: 'CHAT.contextmenu.remove',
      isAdmin: false,
      needAdmin: true,
      action: 1
    },
    {
      name: 'CHAT.contextmenu.removeAdmin',
      isAdmin: true,
      needAdmin: true,
      action: 2
    },
    {
      name: 'CHAT.contextmenu.makeAdmin',
      isAdmin: false,
      needAdmin: true,
      action: 3
    }
  ];

  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit() {}

  showOption(needAdmin, isAdmin) {
    if (!needAdmin) {
      return true;
    }
    if (this.admin) {
      if (this.selectedUser.admin) {
        return needAdmin && isAdmin;
      } else {
        return needAdmin && !isAdmin;
      }
    }
  }

  selectAction(option) {
    this.popover.dismiss({option});
  }
}
