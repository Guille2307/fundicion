import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Popovers
import { SetLanguagePopoverPage } from './setLanguage/setLanguage.page';
import { SendInscriptionComponent } from './sendInscription/sendInscription.component';
import { AddFileComponent } from './addFile/addFile.component';
import { ImagesGalleryService } from '../../services/api/imagesGallery/imagesGallery.service';
import { CalendarComponent } from './calendar/calendar.component';
import { ConfigAgendaComponent } from './configAgenda/configAgenda.component';
import { SetNewPasswordComponent } from './setNewPassword/setNewPassword.component';
import { ContextmenuChatComponent } from './contextmenuChat/contextmenuChat.component';
import { ContextmenuProfileComponent } from './contextmenuProfile/contextmenuProfile.component';
import { CropperImgComponent } from './cropperImg/cropperImg.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { RestrictedAccessComponent } from './restrictedAccess/restrictedAccess.component';

const routes: Routes = [
  {
    path: '',
    component: SetLanguagePopoverPage
  },
  {
    path: '',
    component: SendInscriptionComponent
  },
  {
    path: '',
    component: AddFileComponent
  },
  {
    path: '',
    component: ImagesGalleryService
  },
  {
    path: '',
    component: CalendarComponent
  },
  {
    path: '',
    component: ConfigAgendaComponent
  },
  {
    path: '',
    component: SetNewPasswordComponent
  },
  {
    path: '',
    component: ContextmenuChatComponent
  },
  {
    path: '',
    component: ContextmenuProfileComponent
  },
  {
    path: '',
    component: CropperImgComponent
  },
  {
    path: '',
    component: SpeakersComponent
  },
  {
    path: '',
    component: RestrictedAccessComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class PopoversRoutingModule { }