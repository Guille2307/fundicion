import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { ForgotPasswordComponent } from './pages/forgotPassword/forgotPassword.component';
import { ResetPasswordComponent } from './pages/resetPassword/resetPassword.component';
import { ForgotPasswordRoutingModule } from './forgotPassword-routing.module';

@NgModule({
  declarations: [
    ResetPasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    SharedModule,
    ForgotPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ForgotPasswordModule { }
