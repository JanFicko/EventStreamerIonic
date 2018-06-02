import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  ILatLng,
  Polygon,
  MarkerCluster
} from '@ionic-native/google-maps';
import {EventServiceProvider} from "../../providers/event-service/event-service";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

export class DashboardPage {
  storage = window.localStorage;
  map: GoogleMap;
  public events: any;
  markers: any[] = [];

  constructor(public navCtrl: NavController, public eventServiceProvider: EventServiceProvider,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.loadMap();
    this.addMarkers();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');
  }

  addMarkers() {
    let markersData = JSON.parse(this.storage.getItem("markers"));
    console.log(markersData);

  }

  onMarkerAdded(marker: Marker) {
    marker.one(GoogleMapsEvent.MARKER_CLICK).then(() => {
      alert("Marker " + marker.getTitle() + " is clicked");
    });
  }

}
