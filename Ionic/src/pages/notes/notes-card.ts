import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlertController} from "ionic-angular";

@Component({
  selector: 'notes-card',
  templateUrl: 'notes-card.html'
})
export class NotesCard {
  @Input() note;
  @Output() onDeleteCard = new EventEmitter();
  @Output() onEditCard = new EventEmitter();

  constructor(public alertCtrl: AlertController) {
  }

  onDeleteClick() {
    this.alertCtrl.create({
      title: 'Wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'dialog-cancel',
        },
        {
          text: 'Löschen',
          cssClass: 'dialog-confirm',
          handler: () => {
            this.onDeleteCard.emit(this.note.id);
          }
        }
      ]
    }).present();
  }

  onEditClick() {
    this.onEditCard.emit(this.note);
  }
}
