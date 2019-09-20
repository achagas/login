import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';

import { AlertController } from '@ionic/angular';
import { stringify } from '@angular/compiler/src/util';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  birthday: string ="";
  password: string ="";
  cpassword: string ="";
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public loadingController: LoadingController
    ) { }

  ngOnInit() {
  }

  async register(){
    const {username, birthday, password, cpassword} = this;
      if(password != cpassword){
        this.showAlert("Error!", "Password don't match")
        return console.error("Password don't match")
      }
     
      try{
        this.Loading()
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@eyeonmoney.com', password)
        console.log(res)
        this.loadingController.dismiss();
        this.showAlert("Success", "Welcome!");
        this.router.navigate(['/login'])
      }catch(error){
        this.showAlert("Error", error.message);
      }
  }

  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['Ok']
    })
    await alert.present();
  }

  async Loading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}
