import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Events} from 'ionic-angular';
import {NotesCreatePage} from "./notes-create";
import {DateService} from "../../services/date-service";

@Component({
  templateUrl: 'notes.html'
})
export class NotesPage {
  public notes = [];

  constructor(public navParams: NavParams, public events: Events, public dateService: DateService) {
    events.unsubscribe("event:fab-notes"); // remove old event
    events.subscribe('event:fab-notes', () => {
      this.onCreateNewNoteClick();
    });

    this.notes = [{
      id: Date.now(),
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor " +
            "invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.<br><br>At vero eos " +
            "et accusam et justo duo dolores et ea rebum. 😄😁",
      date: dateService.getDate()
    }, {
      id: Date.now() + 1,
      text: "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim " +
            "placerat facer possim assum. <br><br>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, " +
            "sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
      date: dateService.getDate()
    }];
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
