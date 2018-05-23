import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Events} from 'ionic-angular';

@Component({
  templateUrl: 'notes-card.html'
})
export class NotesCard {
  test = "hallo welt";

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }
}
