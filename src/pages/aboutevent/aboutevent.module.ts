import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutEventPage } from './aboutevent';

@NgModule({
  declarations: [
    AboutEventPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutEventPage),
  ],
  exports: [
    AboutEventPage
  ]
})
export class AboutEventPageModule {}
