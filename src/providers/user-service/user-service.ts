import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  apiUrl = 'http://localhost:3000/api/user';

  constructor(public http: HttpClient) {}


  login(email: string, password: string) {
    let hashedPassword = Md5.hashStr(password);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, JSON.stringify( {"email": email, "password": hashedPassword}), {
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
