import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';

/**
 * Generated class for the AbouteventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aboutevent',
  templateUrl: 'aboutevent.html',
  providers: [EventServiceProvider]
})

export class AboutEventPage {

  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventServiceProvider: EventServiceProvider) {
    this.getEvent(navParams.get('eventId'));
  }

  getEvent(eventId: number) {
    this.eventServiceProvider.getEvent(eventId)
      .then(data => {
        this.event = data;
      });
  }


}
