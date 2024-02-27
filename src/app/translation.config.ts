import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LOCATION_INITIALIZED, registerLocaleData } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Locales
import localeEs from '@angular/common/locales/es';
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';
import localeGl from '@angular/common/locales/gl';
import localeFr from '@angular/common/locales/fr';
import localeEu from '@angular/common/locales/eu';
import localeCa from '@angular/common/locales/ca';

const LNG_KEY = 'SELECTED_LANGUAGE';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

registerLocaleData(localeEs, 'es');
registerLocaleData(localePt, 'pt');
registerLocaleData(localeEn, 'en');
registerLocaleData(localeGl, 'gl');
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEu, 'eu');
registerLocaleData(localeCa, 'ca');

export function ApplicationInitializerFactory(
  translate: TranslateService, injector: Injector) {
  return async () => {
    await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

    let defaultLang = 'es';
    const lng = localStorage.getItem(LNG_KEY);
    if (lng) {
      defaultLang = lng;
    }
    translate.addLangs(['en', 'es', 'gl']);
    translate.setDefaultLang(defaultLang);
    try {
      await translate.use(defaultLang).toPromise();
    } catch (err) {
      console.log(err);
    }
    console.log(`Successfully initialized ${defaultLang} language.`);
  };
}