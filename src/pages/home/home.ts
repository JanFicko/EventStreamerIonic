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

  public user: any;
  public events: any;
  query: any = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public eventServiceProvider: EventServiceProvider) {
    this.loadEvents();
    this.user = JSON.parse(localStorage.getItem("loggedInUser"));
  }

  loadEvents(){
      this.eventServiceProvider.getEvents()
        .then(data => {
          this.events = data;
          console.log(this.events);
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
    let event = this.events.find(item => item._id === eventId);

    this.navCtrl.push('AboutEventPage', {
      eventId: eventId,
      eventName: eventName,
      description: event.opis
    });
  }

  search(event){
    if(event.inputType == 'insertText'){
      this.query += event.data;
    }else if(event.inputType == 'deleteContentBackward'){
      this.query = this.query.substring(0, this.query.length-1);
    }
    console.log(this.query);
    this.findEventByQuery();

  }

  onCancel(event){
    this.query = "";
    console.log(this.query+" -> cancel");
    this.findEventByQuery();
  }

  findEventByQuery(){
    this.eventServiceProvider.getEventByQuery(this.query)
      .then(data => {
        this.events = data;
      });
  }

}
