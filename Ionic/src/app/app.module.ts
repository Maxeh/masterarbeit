import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {TabsPage} from '../pages/_tabs/tabs';
import {NewsPage} from '../pages/news/news';
import {WeatherPage} from "../pages/weather/weather";
import {NotesPage} from "../pages/notes/notes";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SuperTabsModule} from "ionic2-super-tabs";
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    NewsPage,
    WeatherPage,
    NotesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    NewsPage,
    WeatherPage,
    NotesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
