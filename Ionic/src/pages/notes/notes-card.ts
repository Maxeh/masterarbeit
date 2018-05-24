import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlertController} from "ionic-angular";

@Component({
  selector: 'notes-card',
  templateUrl: 'notes-card.html'
})
export class NotesCard {
  @Input() note;
  @Output() onDeleteCard = new EventEmitter();

  constructor(private alertCtrl: AlertController) {
  }

  onDeleteClick() {
    this.alertCtrl.create({
      title: 'Wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'delete-button-dialog-cancel',
        },
        {
          text: 'Löschen',
          cssClass: 'delete-button-dialog-confirm',
          handler: () => {
            this.onDeleteCard.emit(this.note.id);
          }
        }
      ]
    }).present();
  }

  onEditClick() {

  }
}
