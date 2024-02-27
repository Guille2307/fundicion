import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SignupRoutingModule as SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    SharedModule,
    SignupRoutingModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SignupModule { }
