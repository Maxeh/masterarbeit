import {Component} from '@angular/core';
import {AlertController} from "ionic-angular";

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {


  constructor(private alertCtrl: AlertController) {

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
          }
        }
      ]
    }).present();
  }
}
