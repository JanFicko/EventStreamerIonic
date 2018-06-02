import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CategoriesService} from "../../providers/categories-service/categories.service";

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriesService: CategoriesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  onSubmit() {
    let izbraneKategorije: string[] = ["šport", "politika", "zabava"];

    this.categoriesService.updateCategories(izbraneKategorije).then((res)=> {
      if (res) {
        console.log(res);
      }
    },(error)=>{
        console.log(error);
      }
    );
  }

}
