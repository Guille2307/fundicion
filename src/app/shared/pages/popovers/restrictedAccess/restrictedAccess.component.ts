import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'restricted-access',
  templateUrl: './restrictedAccess.component.html',
  styleUrls: ['./restrictedAccess.component.scss'],
})
export class RestrictedAccessComponent implements OnInit {

  constructor(
    private popover: PopoverController,
    private navCtrl: NavController,
    private usersSvc: UsersService,
  ) { }

  ngOnInit() {}

  login() {
    this.usersSvc.removeSelectedUser();
    this.navCtrl.navigateRoot('/login/account');
    this.popover.dismiss();
  }

  createAccount() {
    this.usersSvc.removeSelectedUser();
    this.navCtrl.navigateRoot('/signup');
    this.popover.dismiss();
  }

  cancelPopOver() {
    this.popover.dismiss();
  }
}
