import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {LoginService} from "./login.service";
import {User} from "./User";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: []
})
export class LoginPage {

  public user: User = new User(null, null, null, null, null, null);
  public loggedIn: boolean = false;
  confirmPassword: string;
  passwordErrorMessage: string = null;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public loginService: LoginService) {

    localStorage.removeItem("loggedInUser");
    let loggedInUser = localStorage.getItem("loggedInUser");

    if(loggedInUser) {

      // TODO setToken

      this.loggedIn = true;

      this.redirectHome();
    }

  }

  register() {

    //https://devdactic.com/login-ionic-2/

    if(this.user.password !== this.confirmPassword) {
      this.passwordErrorMessage = "Gesli se ne ujemata";
    }
    else {
      this.passwordErrorMessage = null;
      let user = {
        ime: this.user.name,
        priimek: this.user.surname,
        geslo: this.user.password,
        email: this.user.email,
        tip: this.user.type ? 'novinar' : 'uporabnik',
        medij: this.user.media ? this.user.media : ''
      }

      this.loginService.register(user).then((loggedIn) => {
        if (loggedIn) {
          localStorage.setItem("loggedInUser", JSON.stringify(user.email));
          this.redirectHome();
        }
      }, (err) => {
        console.log(err);
      });
    }

  }

  redirectHome() {
    this.navCtrl.push('HomePage');
  }

}
