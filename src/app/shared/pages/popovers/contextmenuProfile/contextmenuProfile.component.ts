import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'contextmenu-profile',
  templateUrl: './contextmenuProfile.component.html',
  styleUrls: ['./contextmenuProfile.component.scss'],
})
export class ContextmenuProfileComponent implements OnInit {

  @Input() assistant;

  contextmenuOptions = [
    {
      name: 'ASSISTANTS.info.contextmenu.mute',
      muted: false,
      action: 0
    },
    {
      name: 'ASSISTANTS.info.contextmenu.unmute',
      muted: true,
      action: 1
    },
    {
      name: 'ASSISTANTS.info.contextmenu.ban',
      banned: false,
      action: 2
    },
    {
      name: 'ASSISTANTS.info.contextmenu.unban',
      banned: true,
      action: 3
    }
  ];

  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit() {}

  showOption(type) {

  }

  selectAction(option) {
    this.popover.dismiss({option});
  }
}
