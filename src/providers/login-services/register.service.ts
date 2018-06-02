import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RegisterService {

  constructor(public http: HttpClient) {

  }

  public register(user) {

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/user/', JSON.stringify(user), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }
}

