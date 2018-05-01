import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { Tab1Root } from '../pages/pages';
import {EventServiceProvider} from "../providers/event-service/event-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = Tab1Root;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: 'HomePage' },
    { title: 'Add Event', component: 'AddEventPage' },
    { title: 'About Event', component: 'AboutEventPage' }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private network: Network,
              public eventServiceProvider: EventServiceProvider,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
