import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlertController} from "ionic-angular";

@Component({
  selector: 'weather-card',
  templateUrl: 'weather-card.html'
})
export class WeatherCard {
  @Input() city;
  @Output() onDeleteCard = new EventEmitter();
  Math: any;

  constructor(public alertCtrl: AlertController) {
    this.Math = Math;
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
            this.onDeleteCard.emit(this.city.city.id);
          }
        }
      ]
    }).present();
  }
}
