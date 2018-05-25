import {Component} from '@angular/core';
import {AlertController, Events, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: 'weather.html'
})
export class WeatherPage {
  cities = [1,1];

  constructor(private http: HttpClient, public navParams: NavParams, public alertCtrl: AlertController, public events: Events) {
    events.subscribe('event:fab-weather', () => {
      this.onAddCityClick();
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
        },
        {
          text: 'Hinzufügen',
          handler: data => {
            this.cityAdded(data.city);
          }
        }
      ]
    });
    alert.present();
  }

  cityAdded(city) {
    this.http.get('https://maxeh.de/masternews.php?type=weather&city=' + city).subscribe(res => {
      let data: any = res;
      this.cities.push(data);
      console.log(this.cities);
    });
  }
}
