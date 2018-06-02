import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class CategoriesService {

  constructor(public http: HttpClient) {

  }

  updateCategories(categories: string[]) {
    //TODO change to add multiple categories on backend
    //or just use put(/) and add current other data
    let rObject = {id: '', kategorije: categories} //add localstorage loggedInUser.id
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/user/kategorija', JSON.stringify(categories), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(res=> {
        resolve(res);
      },
        err=>{
        reject(err);
      })
    })
  }
}
