import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [EventServiceProvider]
})
export class HomePage {

  public events: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public eventServiceProvider: EventServiceProvider, private network: Network) {
    this.loadEvents();
  }

  loadEvents(){
    if (this.network.type == "none") {
      this.events = JSON.parse(window.localStorage.getItem("events"));
    } else {
      this.eventServiceProvider.getEvents()
        .then(data => {
          this.events = data;
          window.localStorage.setItem("events", JSON.stringify(data))
        });
    }

  }

  addEvent() {
    let addModal = this.modalCtrl.create('AddEventPage');
    addModal.onDidDismiss(() => {
      this.loadEvents();
      console.log(window.localStorage.getItem("test"))
    });
    addModal.present();
  }

  /**
   * Navigate to the detail page for this item.
   */
  openEvent(eventId: number) {
    this.navCtrl.push('AboutEventPage', {
      eventId: eventId
    });
  }

}
