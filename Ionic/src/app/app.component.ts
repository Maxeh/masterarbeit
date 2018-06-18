import {Component, ViewChild} from '@angular/core';
import {App, Events, IonicApp, MenuController, Nav, Platform} from 'ionic-angular';
import {HeaderColor} from "@ionic-native/header-color";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/_tabs/tabs";
import {SettingsPage} from "../pages/settings/settings";
import {InformationPage} from "../pages/information/information";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TabsPage;
  pages = null;

  constructor(
    public appCtrl: App, public ionicApp: IonicApp, public menuCtrl: MenuController,
    public events: Events, public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public headerColor: HeaderColor
  ) {
    this.initializeApp();

    this.pages = [
      {id: 0, icon: 'paper', title: 'News', component: MyApp},
      {id: 1, icon: 'md-sunny', title: 'Wetter', component: MyApp},
      {id: 2, icon: 'create', title: 'Notizen', component: MyApp},
      {id: 3, icon: 'settings', title: 'Einstellungen', component: SettingsPage},
      {id: 4, icon: 'information-circle', title: 'Informationen', component: InformationPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setupBackButtonBehavior();

      this.headerColor.tint('#222222');
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#111');
      this.splashScreen.hide();
    });
  }

  menuOpened() {
    history.pushState({}, null, null);
  }

  setupBackButtonBehavior() {
    // If on web version (browser or PWA)
    if (window.location.protocol !== "file:") {
      window.onpopstate = (evt) => {

        // Close menu if open
        if (this.menuCtrl.isOpen()) {
          this.menuCtrl.close();
          return;
        }

        // Close any active modals or overlays
        let activePortal = this.ionicApp._loadingPortal.getActive() ||
          this.ionicApp._modalPortal.getActive() ||
          this.ionicApp._toastPortal.getActive() ||
          this.ionicApp._overlayPortal.getActive();

        if (activePortal) {
          activePortal.dismiss();
          return;
        }

        // Navigate back
        if (this.appCtrl.getRootNav().canGoBack())
          this.appCtrl.getRootNav().pop();
        else window.history.back();
      };

      // Fake browser history on each view enter
      this.appCtrl.viewDidEnter.subscribe((app) => {
        if (window.history.state === null)
          history.pushState({}, null, null);
      });
    }
  }

  openPage(page) {
    // if new page in superTabs && currently in superTabs
    if (page.id < 3)
      this.events.publish('event:tab-change', {tab: page.id});
    else this.nav.push(page.component);
  }
}
