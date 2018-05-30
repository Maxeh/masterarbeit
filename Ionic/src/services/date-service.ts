import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  getDate() {
    let addZero = i => (i < 10) ? (i = "0" + i) : i;

    let date = new Date();
    let day = addZero(date.getDate());
    let month = addZero(date.getMonth() + 1);
    let year = date.getFullYear();
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());

    let dateString = [day, month, year].join('/');
    dateString += (" - " + hours + ":" + minutes);
    return dateString;
  }

  constructor() {
  }
}
