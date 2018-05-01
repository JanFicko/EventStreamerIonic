import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EventServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventServiceProvider {

  apiUrl = 'http://localhost:3000/api/event/';

  constructor(public http: HttpClient) {}

  getEvents() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getEvent(eventId: number) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+eventId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addEvent(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, JSON.stringify(data), {
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
