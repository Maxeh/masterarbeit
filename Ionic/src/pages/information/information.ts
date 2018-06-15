import {Component} from '@angular/core';
import {MenuController} from "ionic-angular";

@Component({
  templateUrl: 'information.html'
})
export class InformationPage {

  constructor(public menu: MenuController) {}

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
}
