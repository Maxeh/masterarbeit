import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class NotesDetailsPageRoute extends CupertinoPageRoute {
  NotesDetailsPageRoute(onNoteAdded)
      : super(builder: (BuildContext context) => new NotesDetailsPage(onNoteAdded));
}

class NotesDetailsPage extends StatefulWidget {
  final onNoteAdded;
  NotesDetailsPage(this.onNoteAdded, {Key key}) : super(key: key);

  @override
  NotesDetailsPageState createState() => new NotesDetailsPageState();
}

class NotesDetailsPageState extends State<NotesDetailsPage> {
  @override
  Widget build(BuildContext context) {
    return new WillPopScope(
        onWillPop: () async {
          return true;
        },
        child: Scaffold(
            appBar: new AppBar(
              title: Text("Neue Notiz"),
            ),
            body: RaisedButton(onPressed: () {
              Navigator.pop(context);
              widget.onNoteAdded();
            })
        )
    );
  }
}
