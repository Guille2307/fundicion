import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SavedLoginComponent } from './pages/savedLogin/savedLogin.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginAccountComponent } from './pages/loginAccount/loginAccount.component';

@NgModule({
  declarations: [
    LoginComponent,
    SavedLoginComponent,
    LoginAccountComponent,
    ToolbarComponent,
  ],
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class LoginModule { }
