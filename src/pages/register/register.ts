import { Component, OnInit } from '@angular/core';
import {IonicPage, NavController, ModalController, Keyboard} from 'ionic-angular';
import {RegisterService} from "../../providers/login-services/register.service";
import {User} from "../shared/User";
import md5 from 'md5';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserResponse} from "../shared/UserResponse";
import {LoginService} from "../../providers/login-services/login.service";
import {MyApp} from "../../app/app.component";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [RegisterService, LoginService]
})
export class RegisterPage implements OnInit {

  public user: User = new User(null, null, null, null, null, null, null);
  public loggedIn: boolean = false;
  confirmPassword: string;
  passwordErrorMessage: string = null;
  registrationForm = new FormGroup({});
  formErrors = {
    'email': '',
    'name': '',
    'surname': '',
    'password': '',
    'password2': '',
    'type': '',
    'media': ''
  };

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public registerService: RegisterService,
              private fb: FormBuilder, public loginService: LoginService, public keyboard: Keyboard) {

    let loggedInUser = localStorage.getItem("loggedInUser");

    if(loggedInUser) {

      this.loggedIn = true;

      this.redirectHome();
    }

  }

  ngOnInit(){
    this.buildForm();
  }

  register() {

    this.passwordErrorMessage = null;

    let user = {
      ime: this.registrationForm.value.name,
      priimek: this.registrationForm.value.surname,
      geslo: md5(this.registrationForm.value.password),
      email: this.registrationForm.value.email,
      tip: this.registrationForm.value.type ? 'novinar' : 'uporabnik',
      medij: this.registrationForm.value.media ? this.registrationForm.value.media : '-'
    }

    this.registerService.register(user).then((registered) => {
      if (registered) {
        this.login(user.email, this.registrationForm.value.password);
      }
    }, (err) => {
      console.log(err);
    });
  }

  redirectHome() {
    this.navCtrl.push(MyApp);
  }

  goToCategoriesPage() {
    this.navCtrl.push('CategoriesPage');
  }


  buildForm() {
    this.registrationForm = this.fb.group({
      'name': [this.user.name, [Validators.required]],
      'surname': [this.user.surname, [Validators.required]],
      'email': [this.user.email, [Validators.required,
        Validators.pattern('^\\s*[a-z0-9]+(\\.?[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})\\s*$')]],
      'password': [this.user.password, [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
      'password2': [this.user.password2, [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
      'type': [this.user.type?true:false],
      'media': [this.user.media]
    },
      {validator: this.matchingPasswords('password', 'password2')}
      );

    this.registrationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  matchingPasswords(a:string, b:string) {
    if(a===b)
      return true;
    return false;
  }

  onValueChanged(data?: any) {
    if (!this.registrationForm) {
      return;
    }
    const form = this.registrationForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  validationMessages = {
    'name': {
      'required': 'required field',
    },
    'surname': {
      'required': 'required field',
    },
    'email': {
      'required': 'required field',
      'pattern': 'wrong email form'
    },
    'password': {
      'required': 'required field',
      'pattern': 'must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
    },
    'password2': {
      'required': 'required field',
      'pattern': 'must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
    },
    'type': {
      'required': 'required field',
    },
    'media': {
      'required': 'required field',
    }
  };

  clearForm() {
    this.registrationForm.reset();
  }


  async login(email, password) {
    let user = {email: email, geslo: md5(password)};
    let res:any = await this.loginService.login(user);
    if(res.success==null) {
      localStorage.setItem("loggedInUser", JSON.stringify(res));
      this.goToCategoriesPage();
    }
    /*
    this.loginService.login(user).then((res: UserResponse) => {
      console.log(res);
      if(res.success==null) {
        localStorage.setItem("loggedInUser", JSON.stringify(res));
        this.goToCategoriesPage();
      }
    }, (err) => {
      console.log(err);
    });*/
  }



}
