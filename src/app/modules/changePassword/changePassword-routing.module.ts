import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from 'src/app/shared/guards/loggedIn/loggedIn.guard';
import { ChangePasswordComponent } from './pages/changePassword/changePassword.component';


const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent,
    canActivate: [
      LoggedInGuard
    ]
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
export class ChangePasswordRoutingModule { }
