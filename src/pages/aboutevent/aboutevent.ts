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
  public user: any;
  posts = [];
  comment = '';

  eventId: string;
  eventName: string;
  image: FormData;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
              public postServiceProvider: PostServiceProvider, private socket: Socket) {
    this.socket.connect();
    this.user = JSON.parse(localStorage.getItem("loggedInUser"));

    this.eventId = navParams.get('eventId');
    this.eventName = navParams.get('eventName');

    this.getPosts();

    this.getMessages().subscribe(post => {
      console.log("pushed");
      this.posts.push(post);
    });
  }

  getPosts() {
    this.postServiceProvider.getPosts(this.eventId)
      .then(data => {
        if(Object.keys(data).length != 0){
          Object.keys(data).forEach(key => {
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
        observer.next(data.objava[Object.keys(data.objava).length - 1 ]);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  sendImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      let formData = new FormData();
      formData.append("slika", new Blob(imageData), "filename.jpg");
      formData.append("id_dogodek", this.eventId);

      this.postServiceProvider.sendImage(formData);
    }, (err) => {
      console.log(err);
    });
  }

}
