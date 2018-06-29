import 'package:flutter/material.dart';

class NotesPage extends StatefulWidget {
  @override
  NotesPageState createState() => new NotesPageState();
}

class NotesPageState extends State<NotesPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text("dddd"),
        floatingActionButton: new Builder(
            builder: (BuildContext context) {
                return FloatingActionButton(
                  onPressed: () {
                    //NewsPage.of(context).test2();

                  },
                  child: new Icon(Icons.add, color: Colors.white),
                );
            }
        )
    );
  }
}