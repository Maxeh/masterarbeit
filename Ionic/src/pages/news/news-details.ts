import {Component} from '@angular/core';
import {MenuController, NavParams, Platform} from 'ionic-angular';

@Component({
  templateUrl: 'news-details.html'
})
export class NewsDetailsPage {
  article = null;

  constructor(public navParams: NavParams, public platform: Platform, public menu: MenuController) {
    this.article = navParams.get('article');
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
}
