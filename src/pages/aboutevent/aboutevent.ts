import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

  eventId: string;
  eventName: string;
  image: FormData;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
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

  sendImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let formData = new FormData();
      formData.append("image", imageData);

      this.image = formData;
      this.sendFormData();
    }, (err) => {
      console.log(err);
    });
  }

  sendFormData(){
    this.postServiceProvider.sendImage(this.eventId, this.image);
  }

}
