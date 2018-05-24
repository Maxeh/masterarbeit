import {Component, Input} from '@angular/core';

@Component({
  selector: 'news-card',
  templateUrl: 'news-card.html'
})
export class NewsCard {
  @Input() article;

  constructor() {
  }
}
