import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'weather-card',
  templateUrl: 'weather-card.html'
})
export class WeatherCard {
  @Input() city;
  @Output() onDeleteCard = new EventEmitter();
  Math: any;

  constructor() {
    this.Math = Math;
  }

  onDeleteClick() {
    this.onDeleteCard.emit(this.city.city.id);
  }
}
