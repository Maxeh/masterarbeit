import {Component, ViewChild} from '@angular/core';
import {Events} from 'ionic-angular';

import {NewsPage} from "../news/news";
import {WeatherPage} from "../weather/weather";
import {NotesPage} from "../notes/notes";

@Component({
  selector: 'page-home',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  showFab = false;
  activeTab = 0;
  page1 = NewsPage;
  page2 = WeatherPage;
  page3 = NotesPage;
  @ViewChild("supertabs") superTabs;

  constructor(public events: Events) {
    events.unsubscribe("event:tab-change"); // remove old event
    events.subscribe('event:tab-change', (data) => {
      this.onTabChange(data.tab);
    });
  }

  onTabChange(tab) {
    this.superTabs.slideTo(tab);
  }

  onTabSelect(ev: any) {
    ev.index > 0 ? this.showFab = true : this.showFab = false;
    this.activeTab = ev.index;
  }

  onFabButtonClicked() {
    if (this.activeTab == 1) {
      this.events.publish('event:fab-weather');
    }
    else if (this.activeTab == 2) {
      this.events.publish('event:fab-notes');
    }
  }
}
