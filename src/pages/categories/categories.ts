import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CategoriesService} from "../../providers/categories-service/categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyApp} from "../../app/app.component";

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
  providers: [CategoriesService]
})
export class CategoriesPage implements OnInit{

  categoriesForm:FormGroup = null;



  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriesService: CategoriesService,
              private fb: FormBuilder) {
  }


  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {

    let kategorije = [];
    this.categoriesForm.value.news ? kategorije.push({naziv: "Novice"}) : null;
    this.categoriesForm.value.sport ? kategorije.push({naziv: "Šport"}) : null;
    this.categoriesForm.value.culture ? kategorije.push({naziv: "Kultura"}) : null;
    this.categoriesForm.value.entertainment ? kategorije.push({naziv: "Zabava"}) : null;
    this.categoriesForm.value.politics ? kategorije.push({naziv: "Politika"}) : null;
    let user_id = JSON.parse(localStorage.getItem("loggedInUser"))._id;

    let object = {
      _id: user_id,
      kategorija: kategorije
    }

    this.categoriesService.updateCategories(object).then((res)=> {
      if (res) {
        let user = JSON.parse(localStorage.getItem("loggedInUser"));
        if(user != null) {
          user.kategorija = kategorije;
          localStorage.setItem("loggedInUser", JSON.stringify(user));
        }
        this.navCtrl.push(MyApp);
      }
    },(error)=>{
        console.log(error);
      }
    );
  }

  buildForm() {
    this.categoriesForm = this.fb.group({
      'news': [false],
      'sport': [false],
      'culture': [false],
      'entertainment': [false],
      'politics': [false]
    });
  }

}
