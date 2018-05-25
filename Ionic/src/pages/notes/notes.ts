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
      mode: "create",
      id: Date.now(), // as unique id
      noteCreated: (newNote) => this.noteCreated(newNote)
    });
  }

  // callback called by NoteCreatePage
  noteCreated(note) {
    note.text = note.text.replace(/(\r?\n){2,}/g, '<br><br>');
    note.text = note.text.replace(/(\r?\n)/g, '<br>');
    this.notes.push(note);
  }

  // callback called by NoteCreatePage
  noteEdited(note) {
    note.text = note.text.replace(/(\r?\n){2,}/g, '<br><br>');
    note.text = note.text.replace(/(\r?\n)/g, '<br>');
    this.notes.forEach((n) => {
      if (n.id == note.id){
        n.text = note.text;
        n.date = note.date;
      }
    });
  }

  // output event of note-card
  onEditCard(note) {
    this.navParams.get('rootNavCtrl').push(NotesCreatePage, {
      mode: "edit",
      note: note,
      noteEdited: (editedNote) => this.noteEdited(editedNote)
    });
  }

  // output event of note-card
  onDeleteCard(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}
