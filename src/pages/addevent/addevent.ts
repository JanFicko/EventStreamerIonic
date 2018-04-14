import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the AddeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addevent',
  templateUrl: 'addevent.html',
  providers: [EventServiceProvider]
})
export class AddEventPage {
  isReadyToSave: boolean;

  event = {name: "", userId: ""};
  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder,
              public eventServiceProvider: EventServiceProvider, private network: Network) {

    this.form = formBuilder.group({
      name: [''],
      userId: ['']
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  addEvent() {
    if (this.network.type != "none") {
      // Listener in app.component.ts for when internet connection come back
      window.localStorage.setItem("addEventQuery", JSON.stringify(this.form.value))
    } else {
      this.eventServiceProvider.addEvent(this.form.value).then((result) => {
        console.log(result);
      }, (err) => {
        console.log(err);
      });
    }
  }
  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  async done() {
    if (!this.form.valid) {
      return;
    } else {
      await this.addEvent();
    }
    this.viewCtrl.dismiss();
  }

}
