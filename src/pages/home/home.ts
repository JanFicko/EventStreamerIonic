import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [EventServiceProvider]
})
export class HomePage {

  public events: any;
  public user: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public eventServiceProvider: EventServiceProvider) {
    this.loadEvents();
    this.user = JSON.parse(localStorage.getItem("loggedInUser"));
  }

  loadEvents(){
      this.eventServiceProvider.getEvents()
        .then(data => {
          this.events = data;
        });
  }

  addEvent() {
    let addModal = this.modalCtrl.create('AddEventPage');
    addModal.onDidDismiss(() => {
      this.loadEvents();
    });
    addModal.present();
  }

  /**
   * Navigate to the detail page for this item.
   */
  openEvent(eventId: string, eventName: string) {
    this.navCtrl.push('AboutEventPage', {
      eventId: eventId,
      eventName: eventName,
    });
  }

}
