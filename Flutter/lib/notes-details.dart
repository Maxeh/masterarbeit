import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:date_format/date_format.dart';

class NotesDetailsPageRoute extends CupertinoPageRoute {
  NotesDetailsPageRoute(type, onNoteAdded, [note])
      : super(builder: (BuildContext context) => new NotesDetailsPage(type, onNoteAdded, note));
}

class NotesDetailsPage extends StatefulWidget {
  final onNoteAdded;
  final type;
  var note;

  NotesDetailsPage(this.type, this.onNoteAdded, this.note, {Key key}) : super(key: key);

  @override
  NotesDetailsPageState createState() => new NotesDetailsPageState();
}

class NotesDetailsPageState extends State<NotesDetailsPage> {
  TextEditingController textEditingController;
  String date = formatDate(DateTime.now(), [dd, '/', mm, '/', yyyy, ' - ', HH, ':', nn]);
  String note;

  @override
  void initState() {
    super.initState();
    String initialText = widget.type == "edit" ? widget.note.text : "";
    textEditingController = TextEditingController(text: initialText);
  }

  @override
  Widget build(BuildContext context) {
    return new WillPopScope(
        onWillPop: () async {
          return true;
        },
        child: Scaffold(
            appBar: new AppBar(
                title: widget.type == "add" ? Text("Neue Notiz") : Text("Notiz bearbeiten"),
                actions: <Widget>[
                  IconButton(
                      icon: widget.type == "add" ? Icon(Icons.add) : Icon(Icons.create),
                      onPressed: () {
                        Navigator.pop(context);
                        if (textEditingController.text != "" && widget.type == "add")
                          widget.onNoteAdded(textEditingController.text);
                        else if (textEditingController.text != "" && widget.type == "edit")
                          widget.onNoteAdded(widget.note.id, textEditingController.text);
                      }
                  )
                ]
            ),
            body: Container(
                padding: EdgeInsets.all(10.0),
                child: Theme(
                    data: ThemeData(
                        primaryColor: Color(0xFFCDCDCD),
                        primaryColorDark: Color(0xFFCDCDCD),
                        accentColor: Color(0xFFCDCDCD),
                        textSelectionColor: Color(0xFF222222),
                        platform: TargetPlatform.iOS
                    ),
                    child: Column(
                      children: <Widget>[
                        TextField(

                          maxLines: 10,
                          keyboardType: TextInputType.multiline,
                          autofocus: true,
                          controller: textEditingController,
                          decoration: InputDecoration(
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.all(Radius.circular(2.0))
                              ),
                              contentPadding: EdgeInsets.symmetric(
                                  horizontal: 8.0, vertical: 8.0)),
                        ),
                        Container(
                          padding: EdgeInsets.only(top: 3.0),
                          alignment: Alignment.topLeft,
                          child: Text(date, style: TextStyle(color: Color(0xFF222222)))
                        )
                      ],
                    )
                )
            )
        )
    );
  }
}
