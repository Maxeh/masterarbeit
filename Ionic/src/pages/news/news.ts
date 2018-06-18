import {Component} from '@angular/core';
import {App} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {NewsDetailsPage} from "./news-details";

@Component({
  templateUrl: 'news.html'
})
export class NewsPage {
  articles: any = null;

  constructor(public http: HttpClient, public appCtrl: App) {
    this.http.get('https://maxeh.de/masternews.php?type=news').subscribe(res => {
      let data: any = res;
      this.articles = data.articles;
    });
  }

  onNewsCardClick(article) {
    this.appCtrl.getRootNav().push(NewsDetailsPage, {article: article});
  }
}
