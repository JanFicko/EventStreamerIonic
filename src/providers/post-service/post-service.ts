import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PostServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostServiceProvider {

  apiUrl = 'http://localhost:3000/api/post/';

  constructor(public http: HttpClient) {}

  sendPost(eventId: number, comment: string){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, JSON.stringify( {"comment": comment, "eventId": eventId}), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  sendImage(eventId: number) {
    // Ko pošiljaš sliko ji moraš določit key "image"
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, JSON.stringify( {"eventId": eventId}))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getPosts(eventId: number) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+eventId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
