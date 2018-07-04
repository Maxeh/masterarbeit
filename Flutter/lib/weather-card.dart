import 'package:flutter/material.dart';
import 'weather.dart';

class WeatherCard extends StatelessWidget {
  final TextStyle textStyleCaption = TextStyle(fontSize: 18.0, color: Color(0xFF222222));
  final TextStyle textStyle = TextStyle(color: Color(0xFF222222));
  final String weatherUrl = "https://openweathermap.org/img/w/";
  final WeatherItem weatherItem;
  final onDeleteClick;

  WeatherCard(this.weatherItem, this.onDeleteClick);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(left: 15.0),
                child: Text(weatherItem.name, style: textStyleCaption),
              ),
              IconButton(onPressed: () {onDeleteClick(weatherItem.id);}, icon: Icon(Icons.delete, color: Color(0xFF222222))),
            ]
          ),
          Divider(height: 0.0),
          Padding(
            padding: EdgeInsets.all(15.0),
            child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Column(
                      children: <Widget>[
                        Text(weatherItem.weatherDetailList[0].date, style: textStyle),
                        Image.asset("lib/weather/" + weatherItem.weatherDetailList[0].icon + ".png"),
                        Text(weatherItem.weatherDetailList[0].temp.toString() + "°", style: textStyle)
                      ]
                  ),
                  Column(
                      children: <Widget>[
                        Text(weatherItem.weatherDetailList[1].date, style: textStyle),
                        Image.asset("lib/weather/" + weatherItem.weatherDetailList[1].icon + ".png"),
                        Text(weatherItem.weatherDetailList[1].temp.toString() + "°", style: textStyle)
                      ]
                  ),
                  Column(
                      children: <Widget>[
                        Text(weatherItem.weatherDetailList[2].date, style: textStyle),
                        Image.asset("lib/weather/" + weatherItem.weatherDetailList[2].icon + ".png"),
                        Text(weatherItem.weatherDetailList[2].temp.toString() + "°", style: textStyle)
                      ]
                  ),
                  Column(
                      children: <Widget>[
                        Text(weatherItem.weatherDetailList[3].date, style: textStyle),
                        Image.asset("lib/weather/" + weatherItem.weatherDetailList[3].icon + ".png"),
                        Text(weatherItem.weatherDetailList[3].temp.toString() + "°", style: textStyle)
                      ]
                  ),
                  Column(
                      children: <Widget>[
                        Text(weatherItem.weatherDetailList[4].date, style: textStyle),
                        Image.asset("lib/weather/" + weatherItem.weatherDetailList[4].icon + ".png"),
                        Text(weatherItem.weatherDetailList[4].temp.toString() + "°", style: textStyle)
                      ]
                  ),
                  Column(
                      children: <Widget>[
                        Text(weatherItem.weatherDetailList[5].date, style: textStyle),
                        Image.asset("lib/weather/" + weatherItem.weatherDetailList[5].icon + ".png"),
                        Text(weatherItem.weatherDetailList[5].temp.toString() + "°", style: textStyle)
                      ]
                  )
                ]
            )
          ),
        ]
      )
    );
  }
}
