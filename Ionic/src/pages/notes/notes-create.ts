import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'notes-create.html'
})
export class NotesCreatePage {
  @ViewChild('notesTextarea') notesTextarea;
  date = this.getDate();
  mode = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getDate() {
    let addZero = i => (i < 10) ? (i = "0" + i) : i;

    let date = new Date();
    let day = addZero(date.getDate());
    let month = addZero(date.getMonth() + 1);
    let year = date.getFullYear();
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());

    let dateString = [day, month, year].join('/');
    dateString += (" - " + hours + ":" + minutes);
    return dateString;
  }

  ionViewDidLoad() {
    if (this.navParams.data.mode === "edit") {
      this.notesTextarea.value = this.navParams.data.note.text;
      this.mode = "edit";
    }
    else if (this.navParams.data.mode === "create") {
      this.mode = "create";
    }
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.notesTextarea.setFocus();
    }, 1);
  }

  onCreateNoteClick() {
    if (this.notesTextarea.value.trim() !== "") {
      let note = {
        id: this.navParams.data.id,
        text: this.notesTextarea.value,
        date: this.date
      };
      this.navParams.data.noteCreated(note);
    }
    this.navCtrl.pop();
  }

  onEditNoteClick() {
    if (this.notesTextarea.value.trim() !== "") {
      let note = {
        id: this.navParams.data.note.id,
        text: this.notesTextarea.value,
        date: this.date
      };
      this.navParams.data.noteEdited(note);
    }
    this.navCtrl.pop();
  }
}
