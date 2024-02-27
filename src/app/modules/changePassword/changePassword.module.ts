import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { ChangePasswordRoutingModule } from './changePassword-routing.module';
import { ChangePasswordComponent } from './pages/changePassword/changePassword.component';

@NgModule({
  declarations: [
    ChangePasswordComponent,
  ],
  imports: [
    SharedModule,
    ChangePasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ChangePasswordModule { }
