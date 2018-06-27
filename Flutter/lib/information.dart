import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class InformationPageRoute extends CupertinoPageRoute {
  InformationPageRoute() : super(builder: (BuildContext context) => new InformationPage());
}

class InformationPage extends StatefulWidget {
  InformationPage({Key key}) : super(key: key);
  @override
  InformationPageState createState() => new InformationPageState();
}

class InformationPageState extends State<InformationPage> {
  @override
  Widget build(BuildContext context) {
    return new WillPopScope(
        onWillPop: () async {
          return true;
        },
        child: Scaffold(
            appBar: new AppBar(
              title: Text("Informationen"),
            ),
            body: Center(
              child: Text("hello info"),
            )
        )
    );
  }
}