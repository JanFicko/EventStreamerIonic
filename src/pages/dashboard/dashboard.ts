import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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
  MarkerCluster, GoogleMapOptions
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

  mapOptions: GoogleMapOptions = {
    camera: {
      target: {
        lat: 46.56266249999999,
        lng: 15.140457031249994
      },
      zoom: 7
    }
  };

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public eventServiceProvider: EventServiceProvider,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.loadMap();
    this.addMarkers();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', this.mapOptions);
  }

  addMarkers() {
    let markersData = JSON.parse(this.storage.getItem("markers"));
    this.markers = markersData;

    let markers = [];

    for(let i=0; i<markersData.length; i++){

      markers = markers.concat({
        position: {
          lat: markersData[i].lat,
          lng: markersData[i].lng
        },
        title: markersData[i].title,
        disableAutoPan: true,
        icon: 'blue',
        animation: 'DROP',
      });
    }

    this.map.addMarkerCluster({
      markers: markers,
      icons: [
        {
          min: 2, max: 3,
          url: "../../../cluster_1.png",
          label: { color: "white" }
        },
        {
          min: 4,
          url: "../../../cluster_2.png",
          label: { color: "white" }
        }
      ]
    }).then((markerCluster: MarkerCluster) => {

      markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
        let marker: Marker = params[1];
        let markerInfo = this.markers.find(item => item.title == marker.getTitle());

        this.showAlert(marker, markerInfo);

        marker.setTitle(marker.get("name"));
        marker.setSnippet(marker.get("address"));
        marker.showInfoWindow();
      });

    });
  }

  showAlert(marker, markerInfo) {

    let alert = this.alertCtrl.create({
      title: marker.getTitle(),
      message: 'Do you want to visit this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Visit',
          handler: () => {
            this.navCtrl.push('AboutEventPage', {
              eventId: markerInfo.id,
              eventName: marker.getTitle(),
            });
          }
        }
      ]
    });
    alert.present();
  }




}
