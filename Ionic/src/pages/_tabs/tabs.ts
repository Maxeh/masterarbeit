import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import { Events } from 'ionic-angular';

import {NewsPage} from "../news/news";
import {WeatherPage} from "../weather/weather";
import {NotesPage} from "../notes/notes";

@Component({
  selector: 'page-home',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  showFab = false;

  page1 = NewsPage;
  page2 = WeatherPage;
  page3 = NotesPage;

  constructor(public navCtrl: NavController, public events: Events, public appCtrl: App){
  }

  ngAfterViewInit() {
    // must wait for AfterViewInit if you want to modify the tabs instantly
  }

  onTabSelect(ev: any) {
    if (ev.index > 0)
      this.showFab = true;
    else this.showFab = false;
    // console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }

  logIn() {
    this.events.publish('user:login');
  }
}
