import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RestrictedAccessComponent } from '../../pages/popovers/restrictedAccess/restrictedAccess.component';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  public async openPopover(guest) {
    if (!guest && jwt_decode(localStorage.getItem('selecteduserJWT'))['sub'] === 'ANONYMOUS') {
      const popover = await this.popoverCtrl.create({
        component: RestrictedAccessComponent,
        backdropDismiss: true,
        showBackdrop: true,
        cssClass: 'restricted-access'
      });
      await popover.present();
    }
  }
}
