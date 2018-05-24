import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Events} from 'ionic-angular';
import {NotesCreatePage} from "./notes-create";

@Component({
  templateUrl: 'notes.html'
})
export class NotesPage {
  public notes = [];

  constructor(public navParams: NavParams, public events: Events) {
    events.subscribe('event:fab-notes', () => {
      this.onCreateNewNoteClick();
    });
  }

  onCreateNewNoteClick() {
    this.navParams.get('rootNavCtrl').push(NotesCreatePage, {
      noteCreated: (note) => this.noteCreated(note),
      id: Date.now() // as unique id
    });
  }

  noteCreated(note) {
    note.text = note.text.replace(/(\r?\n){2,}/g, '<br><br>');
    note.text = note.text.replace(/(\r?\n)/g, '<br>');
    this.notes.push(note);
  }

  onDeleteCard(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}
