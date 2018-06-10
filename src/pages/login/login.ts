import { Component } from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Platform, ViewController, App} from 'ionic-angular';
import {LoginService} from "../../providers/login-services/login.service";
import {User} from "../shared/User";
import {UserResponse} from "../shared/UserResponse";
import md5 from 'md5';
import {AngularFireModule} from "angularfire2";
import {GooglePlus} from "@ionic-native/google-plus";
import firebase from 'firebase'
import {AngularFireAuth} from "angularfire2/auth";
import {CategoriesPage} from "../categories/categories";
import {RegisterService} from "../../providers/login-services/register.service";
import {HomePage} from "../home/home";
import {MyApp} from "../../app/app.component";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService, RegisterService]
})
export class LoginPage {

  public user: User = new User(null, null, null, null,null, null, null);
  public loggedIn: boolean = false;
  confirmPassword: string;
  passwordErrorMessage: string = null;
  email: string = null;
  password: string = null;
  loggedInUser = null;
  googleUser = null;

  googleCred = null;
  categories = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public loginService: LoginService, public googleplus: GooglePlus, public platform: Platform,
              public afAuth: AngularFireAuth, public registerService: RegisterService,
              private viewCtrl: ViewController, private appCtrl:App) {

    this.checkUser();

  }

  ionViewDidEnter() {
    this.checkUser();
  }

  login() {

    let user = {email: this.email, geslo: md5(this.password)};
    this.loginService.login(user).then((res: UserResponse) => {
      if(res.success==null) {
        localStorage.setItem("loggedInUser", JSON.stringify(res));
        this.navCtrl.push(MyApp).then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });

      }
    }, (err) => {
      console.log(err);
    });

  }

  goToRegistration(){
    this.navCtrl.push('RegisterPage');
  }

  loginWithGoogle() {
    if(this.platform.is('cordova')) {
      /*
      this.googleplus.login({
        'webClientId': 'com.googleusercontent.apps.616828367440-293om2h2millc53c66i3mq3eo6gf5nb5',
        'offline': true
      }).then(res => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then(suc => {
            alert('Log in success');
          }).catch(error => {
          alert('something went wrong');
        })
      })
      */
      this.nativeGoogleLogin();
    }
    else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin() : Promise<void> {
    try{
      this.googleUser = await this.googleplus.login({
        'webClientId': 'com.googleusercontent.apps.616828367440-293om2h2millc53c66i3mq3eo6gf5nb5',
        'offline': true
      });

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(this.googleUser.idToken)
      )
    } catch(error) {
      console.log(error);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      let user = await this.afAuth.auth.signInWithPopup(provider);
      console.log(user);
      if(user) {
        this.tryLogin(user);
      }
      return user;
    } catch(err) {
      console.log(err);
    }
  }

  goToCategoriesPage() {
    this.navCtrl.push('CategoriesPage');
  }

  logOut() {

    localStorage.removeItem("loggedInUser");
    this.loggedIn = false;
    this.loggedInUser = false;
    this.appCtrl.getRootNav().push(MyApp);

  }

  async tryLogin(userReq) {
    let mail = userReq.additionalUserInfo.profile.email;
    let idToken = userReq.additionalUserInfo.profile.id;
    let user = {email: mail, geslo: md5(idToken)};
    let res:any = await this.loginService.login(user);
    if(res.success==null) {
      localStorage.setItem("loggedInUser", JSON.stringify(res));
      this.navCtrl.push(MyApp);
    }
    else {
      let givenName = userReq.additionalUserInfo.profile.given_name;
      let familyName = userReq.additionalUserInfo.profile.family_name;
      console.log(idToken);
      console.log(md5(idToken));
      let rUser = {ime: givenName, priimek: familyName, geslo: md5(idToken), email: mail, tip: "uporabnik", medij: "-"};
      console.log(rUser);
      console.log("ade");
      let res:any = await this.registerService.register(rUser);
      if(res.success != null && res.success == true) {
        let re:any = await this.loginService.login(user);
        if(re.success==null) {
          localStorage.setItem("loggedInUser", JSON.stringify(re));
          this.navCtrl.push("CategoriesPage");
        }
      }
    }
  }

  checkUser() {
    this.loggedInUser  = JSON.parse(localStorage.getItem("loggedInUser"));;

    if(this.loggedInUser) {

      this.loggedIn = true;

      for(let k of this.loggedInUser.kategorija) {
        if(this.categories.indexOf(k.naziv)==(-1))
          this.categories.push(k.naziv);
      }

    }
  }

}
