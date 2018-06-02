import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {LoginService} from "../../providers/login-services/login.service";
import {User} from "../shared/User";
import {UserResponse} from "../shared/UserResponse";
import md5 from 'md5';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: []
})
export class LoginPage {

  public user: User = new User(null, null, null, null,null, null, null);
  public loggedIn: boolean = false;
  confirmPassword: string;
  passwordErrorMessage: string = null;
  email: string = null;
  password: string = null;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public loginService: LoginService) {

    localStorage.removeItem("loggedInUser");
    let loggedInUser = localStorage.getItem("loggedInUser");

    if(loggedInUser) {

      // TODO setToken

      this.loggedIn = true;

      this.redirectHome();
    }

  }

  login() {

    let user = {email: this.email, geslo: md5(this.password)};
    this.loginService.login(user).then((res: UserResponse) => {
      if(res.tip.toLowerCase()=="uporabnik") {
        this.navCtrl.push('HomePage').then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
          localStorage.setItem("loggedInUser", JSON.stringify(res));
        });
      }
      else if(res.tip.toLowerCase()=="novinar"){
        this.navCtrl.push('HomePage').then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
          localStorage.setItem("loggedInUser", JSON.stringify(res));
        });
        //this.navCtrl.setRoot('HomePage');
      }
    }, (err) => {
      console.log(err);
    });

  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  redirectHome() {
    this.navCtrl.push('HomePage');
  }

  goToRegistration(){
    this.navCtrl.push('RegisterPage');
  }

}
