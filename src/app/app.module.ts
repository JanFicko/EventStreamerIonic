import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMaps } from "@ionic-native/google-maps";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user-service/user-service';

import { HttpClientModule } from '@angular/common/http';
import { EventServiceProvider } from '../providers/event-service/event-service';

import { Network } from '@ionic-native/network';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { PostServiceProvider } from '../providers/post-service/post-service';
import {TabsPage} from "../pages/tabs/tabs";
import {HomePage} from "../pages/home/home";
import {DashboardPage} from "../pages/dashboard/dashboard";

import { GooglePlacesAutocompleteComponentModule } from 'ionic2-google-places-autocomplete';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { AlertController } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    SocketIoModule.forRoot(config),
    GooglePlacesAutocompleteComponentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    EventServiceProvider,
    Network,
    GoogleMaps,
    PostServiceProvider,
    Geolocation,
    NativeGeocoder,
    AlertController,
    FilePath
  ]
})
export class AppModule {}
