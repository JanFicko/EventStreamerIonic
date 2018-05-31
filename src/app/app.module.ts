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
import {AddEventPage} from "../pages/addevent/addevent";
import {AboutEventPage} from "../pages/aboutevent/aboutevent";
const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    DashboardPage,
    AddEventPage,
    AboutEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    DashboardPage,
    AddEventPage,
    AboutEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    EventServiceProvider,
    Network,
    GoogleMaps,
    PostServiceProvider
  ]
})
export class AppModule {}
