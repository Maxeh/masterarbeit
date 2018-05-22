import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';

@Component({
  templateUrl: 'weather.html'
})
export class WeatherPage {
  rootNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    console.log("drinW");
  }
}
