import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalInfoRoutingModule } from './legalInfo-routing.module';
import { SharedModule } from '../shared.module';
import { LegalInfoComponent } from './pages/legalInfo/legalInfo.component';
import { CookiesPoliciesComponent } from './pages/cookiesPolicies/cookiesPolicies.component';
import { PrivacyPoliciesComponent } from './pages/privacyPolicies/privacyPolicies.component';
import { TermsOfUseComponent } from './pages/termsOfUse/termsOfUse.component';


@NgModule({
  declarations: [
    LegalInfoComponent,
    CookiesPoliciesComponent,
    PrivacyPoliciesComponent,
    TermsOfUseComponent
  ],
  imports: [
    SharedModule,
    LegalInfoRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class LegalInfoModule { }
