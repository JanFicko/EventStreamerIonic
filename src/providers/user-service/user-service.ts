import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CryptoJS} from "crypto-js";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  apiUrl = 'http://192.168.0.102:3000/api/user';

  constructor(public http: HttpClient) {}


  login(email: string, password: string) {
    let encryptedPassword = CryptoJS.AES.encrypt(password, email);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, JSON.stringify( {"email": email, "password": encryptedPassword}), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/user').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
