import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class InformationPageRoute extends CupertinoPageRoute {
  @override
  Duration get transitionDuration => const Duration(milliseconds: 200);

  InformationPageRoute() : super(builder: (BuildContext context) => InformationPage());
}

class InformationPage extends StatefulWidget {
  InformationPage({Key key}) : super(key: key);

  @override
  InformationPageState createState() => InformationPageState();
}

class InformationPageState extends State<InformationPage> {
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: () async {
          return true;
        },
        child: Scaffold(
            appBar: AppBar(
              title: Text("Informationen"),
            ),
            body: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  Card(
                    margin: EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 0.0),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2.0)),
                    child: Container(
                      padding: EdgeInsets.all(12.0),
                      child: Text(
                          "Die App wurde im Rahmen der Masterarbeit von Maximilian Ehbauer erstellt und hilft dabei, "
                          "verschiedene Frameworks zur Erstellung plattformunabhängiger Apps zu bewerten.",
                          style: TextStyle(color: Color(0xFF222222), height: 1.3)),
                    ),
                  ),
                  Card(
                      margin: EdgeInsets.all(10.0),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2.0)),
                      child: Container(
                          padding: EdgeInsets.all(12.0),
                          child: Text("App Variante 4",
                              style: TextStyle(color: Color(0xFF222222)))))
                ])));
  }
}
