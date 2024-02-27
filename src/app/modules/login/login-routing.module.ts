import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from 'src/app/shared/guards/loggedIn/loggedIn.guard';
import { UserLoggedGuard } from 'src/app/shared/guards/userLogged/userLogged.guard';

import { LoginComponent } from './pages/login/login.component';
import { SavedLoginComponent } from './pages/savedLogin/savedLogin.component';
import { LoginAccountComponent } from './pages/loginAccount/loginAccount.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [
          UserLoggedGuard
        ]
      },
      {
        path: 'account',
        component: LoginAccountComponent,
        canActivate: [
          UserLoggedGuard
        ]
      },
      {
        path: 'account/:user',
        component: SavedLoginComponent,
        canActivate: [
          LoggedInGuard
        ],
        runGuardsAndResolvers: 'always'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
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
export class LoginRoutingModule { }
