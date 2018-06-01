import {Component} from '@angular/core';
import {App} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {NewsDetailsPage} from "./news-details";

@Component({
  templateUrl: 'news.html'
})
export class NewsPage {
  articles: any = null;

  constructor(private http: HttpClient, public appCtrl: App) {
    this.http.get('https://maxeh.de/masternews.php?type=news').subscribe(res => {
      let data: any = res;
    /*  data.articles.forEach((article) => {
        article.thumbnail = article.urlToImage.replace("860_poster", "230_poster");
      });*/
      this.articles = data.articles;
      console.log(this.articles);
    });
  }

  onNewsCardClick(article) {
    this.appCtrl.getRootNav().push(NewsDetailsPage, {article: article});
  }
}
