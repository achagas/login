import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = "";
  password = "";
  constructor(public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public loadingController: LoadingController
    ) { }

  ngOnInit() {
  }
  
  async login(){
    const {username, password} = this
    try{
      this.Loading()
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username +'@eyeonmoney.com',password)
      this.loadingController.dismiss();
      this.showAlert("Success", "Welcome!");
      this.router.navigate(['/home'])
    }catch(err){
      console.dir(err);
      this.loadingController.dismiss();
      if(err.code === "auth/user-not-found") {
        this.showAlert("Error!","User not found!")
				console.log("Usuario não encontrado")
			}else if(err.code ==="auth/wrong-password"){
        this.showAlert("Error!","Password wrong or invalid!")
      }
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
