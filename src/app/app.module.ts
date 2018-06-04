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
import { File } from '@ionic-native/file';

import {LoginPage} from "../pages/login/login";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {GooglePlus} from "@ionic-native/google-plus";
import firebase from 'firebase'
import {LoginPageModule} from "../pages/login/login.module";
import {HomePageModule} from "../pages/home/home.module";

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
const firebaseConfig = {
  apiKey: "AIzaSyC25Fg3Stf_0gLBb5eUOnI2KtE27V4v8qo",
  authDomain: "eventstreamerst.firebaseapp.com",
  databaseURL: "https://eventstreamerst.firebaseio.com",
  projectId: "eventstreamerst",
  storageBucket: "eventstreamerst.appspot.com",
  messagingSenderId: "616828367440"
}
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    SocketIoModule.forRoot(config),
    GooglePlacesAutocompleteComponentModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HomePageModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    DashboardPage,
    LoginPage
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
    FilePath,
    File,
    GooglePlus
  ]
})
export class AppModule {}
