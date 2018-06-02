import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class LoginService {

  constructor(public http: HttpClient) {

  }

  public login(user) {

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/user/login', JSON.stringify(user), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  public allUsers(){
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/user')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}

