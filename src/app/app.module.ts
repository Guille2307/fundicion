// Angular
import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import { EmbedVideo } from "ngx-embed-video";
import { ScrollingModule } from "@angular/cdk/scrolling";

// Ionic
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicStorageModule } from "@ionic/storage-angular";

// Traducciones
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from "@ngx-translate/core";
import {
  ApplicationInitializerFactory,
  HttpLoaderFactory,
} from "./translation.config";

// Componentes
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { PopoversModule } from "./shared/pages/popovers/popovers.module";
import { NavbarComponent } from "./modules/menu/components/navbar/navbar.component";

// Guards
import { LoggedInGuard } from "./shared/guards/loggedIn/loggedIn.guard";
import { UserLoggedGuard } from "./shared/guards/userLogged/userLogged.guard";

// PWA
import { ServiceWorkerModule } from "@angular/service-worker";

// Firebase
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireMessagingModule } from "@angular/fire/compat/messaging";

import { environment } from "../environments/environment";

import { SafariViewController } from "@ionic-native/safari-view-controller/ngx";

// Directives
import { AutoListDividerDirective } from "./shared/directives/autoListDivider/autoListDivider.directive";
import localEs from "@angular/common/locales/es";
registerLocaleData(localEs);

@NgModule({
  declarations: [AppComponent, AutoListDividerDirective, NavbarComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      backButtonText: "",
    }),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    PopoversModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register("combined-sw.js", {
      enabled: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),

    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    EmbedVideo.forRoot(),
    ScrollingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoggedInGuard,
    UserLoggedGuard,
    SafariViewController,
    {
      provide: APP_INITIALIZER,
      useFactory: ApplicationInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true,
    },
    { provide: LOCALE_ID, useValue: "es" },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
