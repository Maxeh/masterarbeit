import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'notes-create.html'
})
export class NotesCreatePage {
  @ViewChild('notesTextarea') notesTextarea;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.notesTextarea.setFocus();
    }, 150);
  }

  onCreateNoteClick() {
    this.navCtrl.pop();
  }
}
