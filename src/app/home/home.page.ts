import { Component, OnInit, ViewChild } from '@angular/core';
//import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  //@ViewChild('tabs', {static: true}) tabs: IonTabs

  constructor() { }

  ngOnInit() {
    //this.tabs.select('wallet');
  }

}
