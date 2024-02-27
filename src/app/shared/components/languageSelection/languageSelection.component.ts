import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SetLanguagePopoverPage } from '../../pages/popovers/setLanguage/setLanguage.page';

@Component({
  selector: 'language-selection',
  templateUrl: './languageSelection.component.html',
  styleUrls: ['./languageSelection.component.scss'],
})
export class LanguageSelectionComponent implements OnInit {

  @Input() sidemenu = false;

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: SetLanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }
}
