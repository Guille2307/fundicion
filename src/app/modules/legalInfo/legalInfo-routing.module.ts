import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LegalInfoComponent } from './pages/legalInfo/legalInfo.component';
import { CookiesPoliciesComponent } from './pages/cookiesPolicies/cookiesPolicies.component';
import { PrivacyPoliciesComponent } from './pages/privacyPolicies/privacyPolicies.component';
import { TermsOfUseComponent } from './pages/termsOfUse/termsOfUse.component';

const routes: Routes = [
  {
    path: '',
    component: LegalInfoComponent,
    children: [
      {
        path: 'policies-cookies',
        component: CookiesPoliciesComponent
      },
      {
        path: 'policies-privacy',
        component: PrivacyPoliciesComponent
      },
      {
        path: 'terms-of-use',
        component: TermsOfUseComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'terms-of-use',
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
export class LegalInfoRoutingModule { }
