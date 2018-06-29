import 'package:flutter/material.dart';

WeatherPageState _weatherPageState;

class WeatherPage extends StatefulWidget {
  WeatherPage({Key key}) : super(key: key);

  @override
  WeatherPageState createState() {
    _weatherPageState = WeatherPageState();
    return _weatherPageState;
  }

  test() {
    _weatherPageState.test2();
    print("okokokok");
  }
}

class WeatherPageState extends State<WeatherPage> {
  void test2() {
    setState(() {
      print("emtpy");
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Container(
      padding: const EdgeInsets.all(8.0),
      //color: Color(0xFF222222),
      alignment: Alignment.center,
      child: new Text('Hello World'),
    );
  }
}