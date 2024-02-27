import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EditProfileRoutingModule } from './editProfile-routing.module';
import { SharedModule } from '../shared.module';
import { EditProfileComponent } from './pages/editProfile/editProfile.component';

@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    SharedModule,
    EditProfileRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class EditProfileModule { }
