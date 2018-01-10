import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import Tesseract from 'tesseract.js'
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview'
import { Text } from '@angular/compiler';
import * as CircularJSON from 'circular-json';
//require CircularJSON = require('circular-json');


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [[Camera]]
})
export class HomePage {

    public base64Image: string;
    public imageTextResult: string;
    public fullImagePath: string;


    constructor(private navController: NavController, private camera: Camera) {
        this.base64Image = "https://placehold.it/150x150";
        this.fullImagePath = "assets/imgs/sFPWe.png";
        Tesseract.recognize(this.fullImagePath).then(function (result) {
            //console.log(result);
            //console.log(result['text'] + "");
            //util
            console.log((CircularJSON.stringify(result)[0]).name);
            //console.log(JSON.stringify(result['text']));
        })
    }
    public takePicture() {
        this.camera.getPicture({
            quality: 75,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: this.camera.EncodingType.JPEG,
            targetWidth: 450,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.base64Image = "data:image/jpeg;base64," + imageData;
            Tesseract.recognize(this.base64Image).then(function (result) {

                this.imageTextResult = result['text'];
            })
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

}
  /*
  constructor(public navCtrl: NavController,private camera: Camera, public toastCtrl: ToastController, private diagnostic:Diagnostic,
    private cameraPreview: CameraPreview) { 
          this.checkPermissions();
          */



  /*
  checkPermissions() {
    this.diagnostic.isCameraAuthorized().then((authorized) => {
        if(authorized)
            this.initializePreview();
        else {
            this.diagnostic.requestCameraAuthorization().then((status) => {
                if(status == this.diagnostic.permissionStatus.GRANTED)
                    this.initializePreview();
                else {
                    // Permissions not granted
                    // Therefore, create and present toast
                    this.toastCtrl.create(
                        {
                            message: "Cannot access camera", 
                            position: "bottom",
                            duration: 5000
                        }
                    ).present();
                }
            });
        }
    });
}
/*
 
initializePreview() {
    // Make the width and height of the preview equal to the width and height of the app's window
    // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
const cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1
  };
  
  // start camera
  this.cameraPreview.startCamera(cameraPreviewOpts).then(
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log(err)
    });
  /*
  // Set the handler to run every time we take a picture
  this.cameraPreview.setOnPictureTakenHandler().subscribe((result) => {
    console.log(result);
    // do something with the result
  });
  * /
  
  
  // picture options
  const pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }
}




  public takePicture() {
    this.camera.getPicture({
        quality : 75,
        destinationType : this.camera.DestinationType.DATA_URL,
        sourceType : this.camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        saveToPhotoAlbum: false
    }).then(imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
    });
}
  / *
  takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
  */
