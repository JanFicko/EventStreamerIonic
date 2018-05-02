import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the AbouteventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aboutevent',
  templateUrl: 'aboutevent.html',
  providers: [PostServiceProvider]
})

export class AboutEventPage {
  posts = [];
  comment = '';

  eventId: number;
  eventName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public postServiceProvider: PostServiceProvider, private socket: Socket) {
    this.socket.connect();

    this.eventId = navParams.get('eventId');
    this.eventName = navParams.get('eventName');

    this.getPosts();

    this.getMessages().subscribe(post => {
      this.posts.push(post);
    });
  }

  getPosts() {
    this.postServiceProvider.getPosts(this.eventId)
      .then(data => {
        if(Object.keys(data).length != 0){
          Object.keys(data).forEach(key => {
            console.log(data[key]);
            this.posts.push(data[key]);
          });
        }
      });
  }

  sendPost() {
    this.postServiceProvider.sendPost(this.eventId, this.comment)
      .then(() => {

      });
    this.comment = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('post', (data) => {
        console.log(data);
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

}
