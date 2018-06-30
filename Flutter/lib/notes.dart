import 'package:flutter/material.dart';
import 'dart:async';

class NotesPage extends StatefulWidget {
  @override
  NotesPageState createState() => new NotesPageState();
}

class NotesPageState extends State<NotesPage> {
  Future<Null> _neverSatisfied() async {
    return showDialog<Null>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return new AlertDialog(
          title: new Text('Rewind and remember'),
          content: new SingleChildScrollView(
            child: new ListBody(
              children: <Widget>[
                new Text('You will never be satisfied.'),
                new Text('You\’re like me. I’m never satisfied.'),
                new TextField(
                  autofocus: true,
                  decoration: InputDecoration(hintText: "Enter Something", contentPadding: const EdgeInsets.symmetric(vertical: 5.0))
                )
              ],
            ),
          ),
          actions: <Widget>[
            new FlatButton(
              child: new Text('Regret'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final bool showFab = MediaQuery.of(context).viewInsets.bottom==0.0?true:false;
    return Scaffold(

      body: Text("dddd"),
        floatingActionButton: showFab ? new Builder(
            builder: (BuildContext context) {
                return FloatingActionButton(
                  onPressed: () {
                    _neverSatisfied();
                    //NewsPage.of(context).test2();

                  },
                  child: new Icon(Icons.add, color: Colors.white),
                );
            }
        ) : null
    );
  }
}