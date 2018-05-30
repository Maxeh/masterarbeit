import {Component, ViewChild} from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/_tabs/tabs";
import {WeatherPage} from "../pages/weather/weather";
import {NavStateService} from "../services/nav-state-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TabsPage;
  pages = null;

  constructor(public events: Events, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public navState: NavStateService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {id: 0, icon: 'paper', title: 'News', component: MyApp},
      {id: 1, icon: 'sunny', title: 'Wetter', component: MyApp},
      {id: 2, icon: 'create', title: 'Notizen', component: MyApp},
      {id: 3, icon: 'settings', title: 'Einstellungen', component: WeatherPage},
      {id: 4, icon: 'information-circle', title: 'Informationen', component: WeatherPage}
    ];
  }

  ionViewWillEnter() {
    this.events.publish('event:tab-change', {tab: this.navState.getNavTab()});
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      /*this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#423f3f');*/
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // check if currently in superTabs
    let inSuperTabs = this.navState.getInSuperTabs();

    // save status of new page in navState
    if (page.id < 3){
      this.navState.setNavTab(page.id);
      this.navState.setInSuperTabs(true);
    }
    else this.navState.setInSuperTabs(false);

    // if new page in superTabs && currently in superTabs
    if (page.id < 3 && inSuperTabs){
      this.events.publish('event:tab-change', {tab: page.id});
    }
    else this.nav.setRoot(page.component);
  }
}
