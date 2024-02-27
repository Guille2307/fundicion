import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageService } from 'src/app/shared/services/language/language.service';

@Component({
  selector: 'language-popover',
  templateUrl: './setLanguage.page.html',
  styleUrls: ['./setLanguage.page.scss'],
})
export class SetLanguagePopoverPage implements OnInit {

  languages = [];
  selected = '';

  constructor(private popoverCtrl: PopoverController, private languageService: LanguageService) { }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }

  select(lng) {
    this.languageService.setLanguage(lng);
    this.popoverCtrl.dismiss();
  }

}
