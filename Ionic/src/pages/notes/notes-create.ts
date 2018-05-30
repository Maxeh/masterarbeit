import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DateService} from "../../services/date-service";

@Component({
  templateUrl: 'notes-create.html'
})
export class NotesCreatePage {
  @ViewChild('notesTextarea') notesTextarea;
  date = null;
  mode = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dateService: DateService) {
    this.date = dateService.getDate();
  }

  ionViewDidLoad() {
    if (this.navParams.data.mode === "edit") {
      let text = this.navParams.data.note.text;
      text = text.replace(/(<br>)/g, '\r\n');
      this.notesTextarea.value = text;
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
