import {Component} from '@angular/core';
import {App, NavParams} from 'ionic-angular';
import {Events} from 'ionic-angular';
import {NotesCreatePage} from "./notes-create";

@Component({
  templateUrl: 'notes.html'
})
export class NotesPage {
  constructor(public navParams: NavParams, public events: Events, public appCtrl: App) {
    events.subscribe('event:fab-notes', () => {
      this.createNewNote();
    });
  }

  createNewNote() {
    this.appCtrl.getRootNav().push(NotesCreatePage);
  }
}
