import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'notes.html'
})
export class NotesPage {
  rootNavCtrl: NavController;
  test = "hallo welt";

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');

    events.subscribe('user:login', () => {
      this.loggedIn();
    });
  }

  loggedIn() {
    console.log("logged in");
    this.test = "success";
  }
}
