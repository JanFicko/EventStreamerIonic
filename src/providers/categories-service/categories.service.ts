import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class CategoriesService {

  constructor(public http: HttpClient) {

  }

  updateCategories(object) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/user/kategorija', JSON.stringify(object), {
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
