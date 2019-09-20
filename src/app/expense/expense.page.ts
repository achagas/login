import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {

  constructor(
    public alert: AlertController,
    public router: Router) { }

  ngOnInit() {
  }
  async addexpense(){
    this.showAlert("Success", "New expense created!");
    this.router.navigate(['/home'])
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
