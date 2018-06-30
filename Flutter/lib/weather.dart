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

/*
@override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        alignment: Alignment.topCenter,
        child: FutureBuilder<List<NewsArticle>>(
            future: fetchPost(),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return ListView.builder(
                  itemBuilder: (BuildContext context, int index) =>
                      Container(
                          padding: EdgeInsets.fromLTRB(3.0, 0.0, 3.0, 0.0),
                          child: NewsCard(snapshot, index)),
                  itemCount: snapshot.data.length,
                );
              } else
                return Container(
                    alignment: Alignment.topCenter,
                    padding: EdgeInsets.only(top: 20.0),
                    child: SizedBox(
                        width: 28.0,
                        height: 28.0,
                        child: CircularProgressIndicator(strokeWidth: 3.0)));
            })),
        floatingActionButton: new Builder(builder: (BuildContext context) {
          return FloatingActionButton(
          onPressed: () {
            Scaffold
                .of(context)
                .showSnackBar(
                new SnackBar(content: new Text('Show Snackbar')));
          },
          child: new Icon(Icons.add, color: Colors.white),
        );
        })
    );
  } */
