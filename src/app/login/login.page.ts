import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';

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
    public router: Router) { }

  ngOnInit() {
  }
  
  async login(){
    const {username, password} = this
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username +'@eyeonmoney.com',password)
      this.showAlert("Success", "Welcome!");
      this.router.navigate(['/home'])
    }catch(err){
      console.dir(err);
      if(err.code === "auth/user-not-found") {
        this.showAlert("Error!","User not found!")
				console.log("Usuario não encontrado")
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

}
