import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class SettingsPageRoute extends CupertinoPageRoute {
  SettingsPageRoute() : super(builder: (BuildContext context) => new SettingsPage());
}

class SettingsPage extends StatefulWidget {
  SettingsPage({Key key}) : super(key: key);
  @override
  SettingsPageState createState() => new SettingsPageState();
}

class SettingsPageState extends State<SettingsPage> {
  @override
  Widget build(BuildContext context) {
    return new WillPopScope(
        onWillPop: () async {
          return true;
        },
        child: Scaffold(
            appBar: new AppBar(
              title: Text("Einstellungen"),
            ),
            body: Center(
              child: Text("hello settings"),
            )
        )
    );
  }
}