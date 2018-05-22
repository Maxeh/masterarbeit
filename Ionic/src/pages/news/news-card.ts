import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'news-card',
  templateUrl: 'news-card.html'
})
export class NewsCard {
  rootNavCtrl: NavController;
  @Input() article;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    console.log("drinW");
  }
}
