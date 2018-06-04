import {HttpClient, HttpParams, HttpRequest, HttpHeaders} from '@angular/common/http';
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

  sendPost(eventId: string, comment: string){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, JSON.stringify( {"komentar": comment, "id_dogodek": eventId}), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /*
   * BUG?
   * https://github.com/angular/angular/issues/13241
    */
  sendImage(formData: FormData) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, formData)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getPosts(eventId: string) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+eventId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getLikesByPost(idEvent, idPost) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+idEvent+"/"+idPost).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  createLike(data){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+"like", data)
        .subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
