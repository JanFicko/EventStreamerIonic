import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { GooglePlacesAutocompleteComponentModule } from 'ionic2-google-places-autocomplete';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { AlertController } from 'ionic-angular';

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
  providers: [EventServiceProvider, GooglePlacesAutocompleteComponentModule]
})
export class AddEventPage {
  isReadyToSave: boolean;

  event = {naziv: "", opis: "", datum:0, id_uporabnik: "", kategorija: [], lokacija: []};
  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder,
              public eventServiceProvider: EventServiceProvider, private nativeGeocoder: NativeGeocoder,
              private alertCtrl: AlertController) {

    this.form = formBuilder.group({
      naziv: [''],
      opis: [''],
      datum: 0,
      id_uporabnik: "5b1065a39b2800215c913317",
      kategorija: [],
      lokacija: []
    });

    this.form.valueChanges.subscribe((v) => {
      this.form.value.datum = new Date(this.form.value.datum).getTime();
      console.log(this.form.value) ;
      this.isReadyToSave = this.form.valid;
    });
  }

  addEvent() {
    let categoryArray = [];
    for (let entry of this.form.value.kategorija) {
      categoryArray.push({
        naziv: entry
      });
    }
    this.form.value.kategorija = categoryArray;

    this.eventServiceProvider.addEvent(this.form.value).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }


  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  locationName(name){
    //test[0].description;
    this.form.value.lokacija = [];
    this.nativeGeocoder.forwardGeocode(name.description)
      .then((coordinates: NativeGeocoderForwardResult) => this.form.value.lokacija = coordinates )
      .catch((error: any) => console.log(error));
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
