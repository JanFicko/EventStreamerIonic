import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {LoginService} from "../../providers/login-services/login.service";

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage)
  ],
  exports: [
    //LoginPage
  ],
  providers: [
    LoginService
  ]
})
export class LoginPageModule {}
