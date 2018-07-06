import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import 'weather-card.dart';

class WeatherDetails {
  String date;
  String icon;
  int temp;

  WeatherDetails(String date, String icon, num temp) {
    this.date = date.split(" ")[1].split(":")[0] + ":" + date.split(" ")[1].split(":")[1];
    this.icon = icon;
    this.temp = (temp - 273.15).round();
  }
}

class WeatherItem {
  final int id;
  final String name;
  final List<WeatherDetails> weatherDetailList = List<WeatherDetails>();

  WeatherItem(this.name, this.id);

  void addWeatherDetails(String date, String icon, num temp) {
    weatherDetailList.add(WeatherDetails(date, icon, temp));
  }
}

class WeatherPage extends StatefulWidget {
  final List<WeatherItem> weatherList = List<WeatherItem>();
  final List<String> startCities = ["Duisburg"];

  WeatherPage({Key key}) : super(key: key) {
    startCities.forEach((city) {
      fetchWeather(city);
    });
  }

  @override
  WeatherPageState createState() => WeatherPageState();

  Future<void> fetchWeather(String city) async {
    final response = await http.get('https://maxeh.de/masternews.php?type=weather&city='+city);
    if (response.statusCode == 200) {
      var decoded = json.decode(response.body);
      WeatherItem weatherItem = WeatherItem(decoded['city']['name'], decoded['city']['id']);
      for (int i = 0; i < 6; i++) {
        weatherItem.addWeatherDetails(
            decoded['list'][i]['dt_txt'],
            decoded['list'][i]['weather'][0]["icon"],
            decoded['list'][i]['main']['temp']
        );
      }
      weatherList.add(weatherItem);
    } else {
      throw Exception('Failed to load data');
    }
  }
}

class WeatherPageState extends State<WeatherPage> {

  void fetchWeather(String city) async {
    widget.fetchWeather(city).then((n) {
      setState(() {});
    });
  }

  Future<Null> onDeleteClick(int id) async {
    return showDialog<Null>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Wirklich löschen?'),
          actions: <Widget>[
            FlatButton(
              child: Text('Abbrechen'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            FlatButton(
              child: Text('Löschen', style: TextStyle(color: Color(0xFFF53D3D))),
              onPressed: () {
                for (int i = 0; i < widget.weatherList.length; i++) {
                  if (widget.weatherList[i].id == id) {
                    widget.weatherList.removeAt(i);
                    setState(() {});
                  }
                }
                Navigator.of(context).pop();
              },
            )
          ],
        );
      },
    );
  }

  Future<Null> onAddClick() async {
    final textEditingController = TextEditingController();

    return showDialog<Null>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Name der Stadt'),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                TextField(
                    autofocus: true,
                    decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(vertical: 5.0)),
                    controller: textEditingController
                )
              ],
            ),
          ),
          actions: <Widget>[
            FlatButton(
                child: Text('Abbrechen'),
                onPressed: () {
                  Navigator.of(context).pop();
                }
            ),
            FlatButton(
                child: Text('Hinzufügen'),
                onPressed: () {
                  if (textEditingController.text != "") {
                    fetchWeather(textEditingController.text);
                  }
                  Navigator.of(context).pop();
                }
            )
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    if (widget.weatherList.length > 0) {
      List<Widget> listArray = [];
      widget.weatherList.forEach((item) {
        listArray.add(WeatherCard(item, onDeleteClick));
      });
      return Scaffold(
          resizeToAvoidBottomPadding: false,
          body: ListView(
              padding: EdgeInsets.only(bottom: 75.0),
              children: listArray
          ),
          floatingActionButton: Builder(builder: (BuildContext context) {
            return FloatingActionButton(
              heroTag: null,
              onPressed: () {
                onAddClick();
              },
              child: Icon(Icons.add, color: Colors.white),
            );
          })
      );
    } else {
      return Scaffold(
          resizeToAvoidBottomPadding: false,
          body: Container(
              padding: EdgeInsets.only(top: 20.0),
              alignment: Alignment.topCenter,
              child: Text("Keine Städte hinzugefügt",
                  style: TextStyle(color: Color(0xFF222222)))
          ),
          floatingActionButton: Builder(builder: (BuildContext context) {
            return FloatingActionButton(
              heroTag: null,
              onPressed: () {
                onAddClick();
              },
              child: Icon(Icons.add, color: Colors.white),
            );
          })
      );
    }
  }
}