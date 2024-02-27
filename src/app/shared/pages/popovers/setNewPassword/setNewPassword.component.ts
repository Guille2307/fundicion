import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'set-new-password',
  templateUrl: './setNewPassword.component.html',
  styleUrls: ['./setNewPassword.component.scss'],
})
export class SetNewPasswordComponent implements OnInit {

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  closePopover() {
    this.popoverCtrl.dismiss();
  }
}
