import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutEventPage } from './aboutevent';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    AboutEventPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutEventPage),
  ],
  exports: [
    AboutEventPage
  ],
  providers: [
    Camera
  ]
})
export class AboutEventPageModule {}
