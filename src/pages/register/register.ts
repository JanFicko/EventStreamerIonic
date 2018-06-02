import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {RegisterService} from "../../providers/login-services/register.service";
import {User} from "../shared/User";
import md5 from 'md5';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: []
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
              private fb: FormBuilder) {

    localStorage.removeItem("loggedInUser");
    let loggedInUser = localStorage.getItem("loggedInUser");

    if(loggedInUser) {

      // TODO setToken

      this.loggedIn = true;

      this.redirectHome();
    }

  }

  ngOnInit(){
    this.buildForm();
  }

  register() {

    //https://devdactic.com/login-ionic-2/

    this.passwordErrorMessage = null;
    let user = {
      ime: this.user.name,
      priimek: this.user.surname,
      //geslo: passwordHasher.generate(this.user.password, {algorithm: 'sha256', saltLength:12, iterations: 4}),
      geslo: md5(this.user.password),
      email: this.user.email,
      tip: this.user.type ? 'novinar' : 'uporabnik',
      medij: this.user.media ? this.user.media : '-'
    }

    this.registerService.register(user).then((loggedIn) => {
      if (loggedIn) {
        localStorage.setItem("loggedInUser", JSON.stringify(user.email));
        this.redirectHome();
      }
    }, (err) => {
      console.log(err);
    });


  }

  redirectHome() {
    this.navCtrl.push('HomePage');
  }

  testPass() {
    var h = "MatejM";
    for (var i = 0; i < 10; i++) {
      var h_h = md5(h);
      console.log(h_h);
    }


    /*
    var pass = "MatejMarkoGeslo";
    var pass_h = passwordHasher.generate(pass, {algorithm: 'sha256', saltLength:12, iterations: 4});
    console.log(passwordHasher.verify(pass, pass_h));
    console.log(passwordHasher.verify("123", pass_h));
    */
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






}
