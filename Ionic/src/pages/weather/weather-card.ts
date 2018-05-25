import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'weather-card',
  templateUrl: 'weather-card.html'
})
export class WeatherCard {
  @Input() city;

  constructor() {
  }
}
