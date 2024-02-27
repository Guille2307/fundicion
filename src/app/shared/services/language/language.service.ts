import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selected = '';

  languages = [
    { text: 'English', value: 'en', img: 'assets/img/flags/en.webp', selectable: true},
    { text: 'Español', value: 'es', img: 'assets/img/flags/es.webp', selectable: true},
    { text: 'Galego', value: 'gl', img: 'assets/img/flags/gl.webp', selectable: true},
    { text: 'Català', value: 'ca', img: 'assets/img/flags/ca.webp', selectable: false},
    { text: 'Português', value: 'pt', img: 'assets/img/flags/pt.webp', selectable: false},
    { text: 'Français', value: 'fr', img: 'assets/img/flags/fr.webp', selectable: false},
    { text: 'Euskera', value: 'eu', img: 'assets/img/flags/eu.webp', selectable: false}
  ];

  constructor(
    private translate: TranslateService,
    private storage: Storage
  ) { }

    setInitialLanguage() {
      // // Para obtener el idioma del propio dispositivo
      // const language = this.translate.getBrowserLang();
      // this.translate.setDefaultLang(language);

      const defaultLanguage = 'es';

      this.translate.setDefaultLang(defaultLanguage);

      const lng = localStorage.getItem(LNG_KEY);
      if (lng) {
        this.translate.use(lng);
        this.selected = lng;
        localStorage.setItem(LNG_KEY, lng);
        // this.storage.set(LNG_KEY, lng);
        this.selected = lng;
      } else {
        localStorage.setItem(LNG_KEY, defaultLanguage);
      }
      // this.storage.get(LNG_KEY).then(val => {
      //   if (val) {
      //     this.setLanguage(val);
      //     this.selected = val;
      //   }
      // });
    }

    public getLanguages() {
      const selectableLanguages = [];
      this.languages.forEach(language => {
        if (language.selectable) {
          selectableLanguages.push(language);
        }
      });
      return selectableLanguages;
    }

    setLanguage(lng) {
      this.translate.use(lng);
      this.selected = lng;
      localStorage.setItem(LNG_KEY, lng);
      // this.storage.set(LNG_KEY, lng);
      window.location.reload();
    }
}
