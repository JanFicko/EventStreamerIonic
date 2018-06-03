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
import {LoginPage} from "../pages/login/login";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {GooglePlus} from "@ionic-native/google-plus";
import firebase from 'firebase'
import {LoginPageModule} from "../pages/login/login.module";
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
    HomePage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    SocketIoModule.forRoot(config),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
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
    GooglePlus
  ]
})
export class AppModule {}
