import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from 'src/app/shared/guards/loggedIn/loggedIn.guard';

import { EditProfileComponent } from './pages/editProfile/editProfile.component';

const routes: Routes = [
  {
    path: '',
    component: EditProfileComponent,
    // canActivate: [
    //   LoggedInGuard
    // ]
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
export class EditProfileRoutingModule { }
