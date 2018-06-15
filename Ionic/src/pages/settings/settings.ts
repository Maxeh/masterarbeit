import {Component} from '@angular/core';
import {MenuController} from "ionic-angular";

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public menu: MenuController) {}

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
}
