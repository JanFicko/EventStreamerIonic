import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

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
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
              public postServiceProvider: PostServiceProvider, private socket: Socket, private file: File) {
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

  /*
   * https://ionicframework.com/docs/native/file/
   */
   sendImage(){
     this.camera.getPicture(this.options).then((imageData) => {
      let fileNameArray = imageData.split("/");
      let fileName = fileNameArray[fileNameArray.length - 1];

      /*this.file.resolveDirectoryUrl(this.file.dataDirectory)
        .then((directoryEntry) => {
          this.file.getFile(directoryEntry, imageData, fileName)
            .then((fileEntry) => {
              let formData = new FormData();
              formData.append("slika", "tukaj1");
              formData.append("id_dogodek", this.eventId);
              this.postServiceProvider.sendImage(formData);
            })
        });*/

      this.file.readAsArrayBuffer(this.file.externalCacheDirectory, fileName)
        .then((arrayBuffer) => {
          let formData = new FormData();
          formData.append("slika", new Blob([new Uint8Array(arrayBuffer)]));
          formData.append("id_dogodek", this.eventId);
          this.postServiceProvider.sendImage(formData);
        })

    }, (err) => {
      console.log(err);
    });
  }

}
