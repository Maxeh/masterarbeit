import {Component} from '@angular/core';
import {NavParams, Platform} from 'ionic-angular';

@Component({
  templateUrl: 'news-details.html'
})
export class NewsDetailsPage {
  article = null;

  constructor(public navParams: NavParams, public platform: Platform) {
    this.article = navParams.get('article');
    console.log(this.article);
  }
}
