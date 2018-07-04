import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class SettingsPageRoute extends CupertinoPageRoute {
  SettingsPageRoute() : super(builder: (BuildContext context) => SettingsPage());
}

class SettingsPage extends StatefulWidget {
  SettingsPage({Key key}) : super(key: key);
  @override
  SettingsPageState createState() => SettingsPageState();
}

class SettingsPageState extends State<SettingsPage> {
  bool checkbox1 = true;
  bool checkbox2 = false;
  bool checkbox3 = false;
  bool checkbox4 = false;
  String radioValue = "openweathermap";

  @override
  Widget build(BuildContext context) {
    return new WillPopScope(
        onWillPop: () async {
          return true;
        },
        child: Scaffold(
            appBar: AppBar(
              title: Text("Einstellungen"),
            ),
            body: ListView(
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.all(20.0),
                  child: Text("Nachrichten Quellen", style: TextStyle(fontSize: 20.0))
                ),
                Divider(height: 0.0),
                ListTile(
                  onTap: () { setState(() {checkbox1 = !checkbox1;});},
                  leading: Checkbox(
                    value: checkbox1,
                    onChanged: (bool newValue) { setState(() {checkbox1 = !checkbox1; });}
                  ),
                  title: const Text('Reuters'),
                ),
                Padding(
                  padding: EdgeInsets.only(left: 27.0),
                  child: Divider(height: 0.0)
                ),
                ListTile(
                  onTap: () { setState(() {checkbox2 = !checkbox2;});},
                  leading: Checkbox(
                      value: checkbox2,
                      onChanged: (bool newValue) { setState(() {checkbox2 = !checkbox2;});}
                  ),
                  title: const Text('Spiegel Online'),
                ),
                Padding(
                    padding: EdgeInsets.only(left: 27.0),
                    child: Divider(height: 0.0)
                ),
                ListTile(
                  onTap: () { setState(() {checkbox3 = !checkbox3;});},
                  leading: Checkbox(
                      value: checkbox3,
                      onChanged: (bool newValue) { setState(() {checkbox3 = !checkbox3;});}
                  ),
                  title: const Text('Focus Online'),
                ),
                Padding(
                    padding: EdgeInsets.only(left: 27.0),
                    child: Divider(height: 0.0)
                ),
                ListTile(
                  onTap: () { setState(() {checkbox4 = !checkbox4;});},
                  leading: Checkbox(
                      value: checkbox4,
                      onChanged: (bool newValue) { setState(() {checkbox4 = !checkbox4;});}
                  ),
                  title: const Text('Handelsblatt'),
                ),
                Divider(height: 0.0),
                Padding(
                    padding: EdgeInsets.all(20.0),
                    child: Text("Wetter Quellen", style: TextStyle(fontSize: 20.0))
                ),
                Divider(height: 0.0),
                ListTile(
                  contentPadding: EdgeInsets.fromLTRB(25.0,0.0,20.0,0.0),
                  onTap: () { setState(() {radioValue = "openweathermap";});},
                  trailing: Radio(
                      value: "openweathermap",
                      groupValue: radioValue,
                      onChanged: (String newValue) { setState(() {radioValue = newValue;});}
                  ),
                  title: const Text('OpenWeatherMap'),
                ),
                Padding(
                    padding: EdgeInsets.only(left: 27.0),
                    child: Divider(height: 0.0)
                ),
                ListTile(
                  contentPadding: EdgeInsets.fromLTRB(25.0,0.0,20.0,0.0),
                  onTap: () { setState(() {radioValue = "wetteronline";});},
                  trailing: Radio(
                      value: "wetteronline",
                      groupValue: radioValue,
                      onChanged: (String newValue) { setState(() {radioValue = newValue;});}
                  ),
                  title: const Text('Wetter Online'),
                ),
                Padding(
                    padding: EdgeInsets.only(left: 27.0),
                    child: Divider(height: 0.0)
                ),
                ListTile(
                  contentPadding: EdgeInsets.fromLTRB(25.0,0.0,20.0,0.0),
                  onTap: () { setState(() {radioValue = "wetter24";});},
                  trailing: Radio(
                      value: "wetter24",
                      groupValue: radioValue,
                      onChanged: (String newValue) { setState(() {radioValue = newValue;});}
                  ),
                  title: const Text('Wetter24'),
                ),
                Divider(height: 0.0),
              ],
            )
        )
    );
  }
}