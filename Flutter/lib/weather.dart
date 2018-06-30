import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import 'weather-card.dart';

class WeatherDetails {
  String date;
  String icon;
  int temp;

  WeatherDetails(String date, String icon, double temp) {
    this.date = date.split(" ")[1].split(":")[0] + ":" + date.split(" ")[1].split(":")[1];
    this.icon = icon;
    this.temp = (temp - 273.15).round();
  }
}

class WeatherItem {
  final String name;
  final List<WeatherDetails> weatherDetailList = new List<WeatherDetails>();

  WeatherItem(this.name);

  void addWeatherDetails(String date, String icon, double temp) {
    weatherDetailList.add(new WeatherDetails(date, icon, temp));
  }
}

class WeatherPage extends StatefulWidget {
  final List<WeatherItem> weatherList = List<WeatherItem>();
  final List<String> startCities = ["Duisburg", "Bocholt"];

  WeatherPage({Key key}) : super(key: key) {
    startCities.forEach((city) {
      fetchPost(city);
    });
  }

  @override
  WeatherPageState createState() => WeatherPageState();

  Future<void> fetchPost(String city) async {
    print("called");
    final response = await http.get('https://maxeh.de/masternews.php?type=weather&city='+city);
    if (response.statusCode == 200) {
      var decoded = json.decode(response.body);
      WeatherItem weatherItem = WeatherItem(decoded['city']['name']);
      for (int i = 0; i < 6; i++) {
        weatherItem.addWeatherDetails(
            decoded['list'][i]['dt_txt'],
            decoded['list'][i]['weather'][0]["icon"],
            decoded['list'][i]['main']['temp']
        );
      }
      weatherList.add(weatherItem);
    } else {
      throw Exception('Failed to load post');
    }
  }
}

class WeatherPageState extends State<WeatherPage> {

  void fetchPost(String city) async {
    widget.fetchPost(city).then((n) {
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    if (widget.weatherList.length > 0) {
      List<Widget> listArray = [];
      widget.weatherList.forEach((item) {
        listArray.add(WeatherCard(item));
      });
      return Scaffold(
          body: ListView(
              children: listArray
          ),
          floatingActionButton: new Builder(builder: (BuildContext context) {
            return FloatingActionButton(
              onPressed: () {},
              child: new Icon(Icons.add, color: Colors.white),
            );
          })
      );
    } else {
      return Container(
          padding: EdgeInsets.only(top: 20.0),
          alignment: Alignment.topCenter,
          child: Text("Keine Städte hinzugefügt",
              style: TextStyle(color: Color(0xFF222222)))
      );
    }
  }
}