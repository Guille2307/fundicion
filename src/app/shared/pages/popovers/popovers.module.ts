import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared.module';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { PopoversRoutingModule } from './popovers-routing.module';

import {NgxImageCompressService} from 'ngx-image-compress';
import { ImageCropperModule } from 'ngx-image-cropper';

// Popovers
import { SetLanguagePopoverPage } from './setLanguage/setLanguage.page';
import { SendInscriptionComponent } from './sendInscription/sendInscription.component';
import { AddFileComponent } from './addFile/addFile.component';
import { ImageFullScreenComponent } from './imageFullScreen/imageFullScreen.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ConfigAgendaComponent } from './configAgenda/configAgenda.component';
import { SetNewPasswordComponent } from './setNewPassword/setNewPassword.component';
import { ContextmenuChatComponent } from './contextmenuChat/contextmenuChat.component';
import { ContextmenuProfileComponent } from './contextmenuProfile/contextmenuProfile.component';
import { CropperImgComponent } from './cropperImg/cropperImg.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { MonthsComponent } from './months/months.component';
import { RestrictedAccessComponent } from './restrictedAccess/restrictedAccess.component';

@NgModule({
  declarations: [
    SetLanguagePopoverPage,
    SendInscriptionComponent,
    AddFileComponent,
    ImageFullScreenComponent,
    CalendarComponent,
    ConfigAgendaComponent,
    SetNewPasswordComponent,
    ContextmenuChatComponent,
    ContextmenuProfileComponent,
    CropperImgComponent,
    SpeakersComponent,
    MonthsComponent,
    RestrictedAccessComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PopoversRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    NgxImageCompressService
  ]
})
export class PopoversModule {}
