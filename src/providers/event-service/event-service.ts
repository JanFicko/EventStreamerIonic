import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EventServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventServiceProvider {

  storage = window.localStorage;
  apiUrl = 'http://192.168.0.106:3000/api/event/';
  markers: any;
  location: any;

  constructor(public http: HttpClient) {}

  getEvents() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        this.setMarkers(data);
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

  getEventByQuery(query) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+query).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addEvent(data) {
    this.setMarkers(data);

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

  setMarkers(data){
    let markers: any[] = [];
    const events: any = data;
    let locations: any[] = [];

    for (let i = 0; i < events.length; i++) {
      markers = markers.concat({
        id: events[i]._id,
        lat: events[i].lokacija[0].latitude,
        lng: events[i].lokacija[0].longitude,
        title: events[i].naziv
      });
    }

    this.markers = JSON.stringify(markers);

    this.saveMarkersToLocalStorage();
  }

  saveMarkersToLocalStorage(){
    if(this.markers != undefined){
      if(this.storage.getItem("markers")){
        this.storage.removeItem("markers");
      }
      this.storage.setItem("markers", this.markers);
    }
  }

}
