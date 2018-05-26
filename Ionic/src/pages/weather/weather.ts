import {Component} from '@angular/core';
import {AlertController, Events} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: 'weather.html'
})
export class WeatherPage {
  startCities = ["Essen", "Leipzig"];
  cities: any = [];

  constructor(private http: HttpClient, public alertCtrl: AlertController, public events: Events) {
    events.subscribe('event:fab-weather', () => {
      this.onAddCityClick();
    });
    this.startCities.forEach((city) => {
      this.cityAdd(city);
    });
  }

  onAddCityClick() {
    let alert = this.alertCtrl.create({
      cssClass: 'city-alert',
      title: 'Name der Stadt',
      inputs: [{
          name: 'city',
      }],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'dialog-cancel',
        },
        {
          text: 'Hinzufügen',
          cssClass: 'dialog-confirm',
          handler: data => {
            this.cityAdd(data.city);
          }
        }
      ]
    });
    alert.present();
  }

  cityAdd(city) {
    this.http.get('https://maxeh.de/masternews.php?type=weather&city=' + city).subscribe(res => {
      if ((res as any).cod === "200") {
        this.cities.push(res);
      }
    });
  }

  // output event of weather-card
  onDeleteCard(id){
    this.cities = this.cities.filter((city) => city.city.id !== id);
  }
}
