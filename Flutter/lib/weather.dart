import 'package:flutter/material.dart';

class WeatherPage extends StatefulWidget {
  WeatherPage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  WeatherPageState createState() => new WeatherPageState();
}

class WeatherPageState extends State<WeatherPage> {
  @override
  Widget build(BuildContext context) {
    return new Container(
      padding: const EdgeInsets.all(8.0),
      color: Color(0xFF222222),
      alignment: Alignment.center,
      child: new Text('Hello World', style: Theme.of(context).textTheme.display1.copyWith(color: Colors.white)),
    );
  }
}