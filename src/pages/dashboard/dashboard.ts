import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import {GoogleMaps, GoogleMap, GoogleMapsEvent, Marker} from '@ionic-native/google-maps';
import {EventServiceProvider} from "../../providers/event-service/event-service";

@IonicPage()
@Component({
  providers: [EventServiceProvider],
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

export class DashboardPage {
  map: GoogleMap;
  public events: any;
  markers: any[] = [];

  constructor(public navCtrl: NavController, public eventServiceProvider: EventServiceProvider,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.loadMap();
    this.getPositions();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');
    console.log("NOT");
  }

  getPositions(){
    this.eventServiceProvider.getEvents().then(data => {
      this.events = data;

      for (let i = 0; i < this.events.length; i++) {
        this.markers = this.markers.concat({
          longitude: this.events[i].lokacija[0].longitude,
          latitude: this.events[i].lokacija[0].latitude,
          title: this.events[i].naziv
        });
      }

      const positionsJSON = JSON.parse(JSON.stringify(this.markers));
      console.log(positionsJSON);

      this.addMarkers();

    }).catch(err => {
      console.log(err);
    });
  }

  addMarkers(){
    for(let i=0; i<this.markers.length; i++){
      console.log(this.markers[i].longitude+" -> TITLE");

      this.map.addMarkerSync({
        position: {
          lat: this.markers[i].latitude,
          lng: this.markers[i].longitude
        },
        title: this.markers[i].title,
        disableAutoPan: true
      });
    }

    this.map.addMarker({
      position: {
        lat: 43.0741804,
        lng: -89.381
      },
      title: "A",
      disableAutoPan: true
    }).then(this.onMarkerAdded);

  }

  onMarkerAdded(marker: Marker) {
    marker.one(GoogleMapsEvent.MARKER_CLICK).then(() => {
      alert("Marker" + marker.getTitle() + " is clicked");
    });
  }

}
