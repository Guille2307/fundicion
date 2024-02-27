import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './shared/services/language/language.service';
import { UsersService } from './shared/services/users/users.service';
import { ApiService } from './shared/services/api/api.service';

import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { SwUpdate } from '@angular/service-worker';
import { MobileService } from './shared/services/mobile/mobile.service';
import { AssistantsService } from './shared/services/api/assistants/assistants.service';

@Component({
  selector: 'app-root',
  template: `<ion-app>
    <ion-router-outlet>
      <!-- <navbar *ngIf="showNavbar" id="navbar" [tabs]="tabsNavbar"></navbar> -->
    </ion-router-outlet>
  </ion-app>`,
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageSvc: LanguageService,
    private usersSvc: UsersService,
    private apiSvc: ApiService,
    private safariViewController: SafariViewController,
    public updates: SwUpdate,
    public mobileService: MobileService,
    public assistantsSvc: AssistantsService
  ) {
    this.initializeApp();
    this.showNavbar = this.mobileService.isMobile();
  }

  tabsNavbar = [
    {
      url: 'menu/event',
      icon: 'information-circle'
    },
    {
      url: 'menu/companies',
      icon: 'exhibitor'
    },
    {
      url: 'menu/meetings',
      icon: 'handshake'
    },
    {
      url: 'menu/gallery',
      icon: 'picture'
    },
    {
      url: 'menu/assistants',
      icon: 'people'
    }
  ];

  showNavbar = false;

  initializeApp() {
    this.updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    this.updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
    this.updates.available.subscribe(event => {
      this.updates.activateUpdate().then(() => this.updateApp());
    });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.languageSvc.setInitialLanguage();
      this.apiSvc.setInitialURL();
      this.usersSvc.getInitialSavedUsers();
      this.safariController();
      this.getAssistants();
    });
  }

  safariController() {
    if (this.platform.is('iphone') || this.platform.is('ios') || this.platform.is('ipad')) {
      this.safariViewController.isAvailable()
        .then((available: boolean) => {
          if (available) {

            this.safariViewController.show({
              url: 'https://ionic.io',
              hidden: false,
              animated: false,
              transition: 'curl',
              enterReaderModeIfAvailable: true,
              tintColor: '#ff0000'
            })
              .subscribe((result: any) => {
                if (result.event === 'opened') { console.log('Opened'); }
                else if (result.event === 'loaded') { console.log('Loaded'); }
                else if (result.event === 'closed') { console.log('Closed'); }
              },
                (error: any) => console.error(error)
              );

          } else {
            // use fallback browser, example InAppBrowser
          }
        }
        );
    }
  }

  updateApp() {
    document.location.reload();
    console.log('The app is updating right now');
  }

  async getAssistants() {
    this.assistantsSvc.assistants = await this.assistantsSvc.getAssistants().then((result) => result.users);
  }
}
