import 'package:flutter/material.dart';
import 'notes-card.dart';
import 'notes-details.dart';
import 'package:date_format/date_format.dart';
import 'dart:async';


class NoteItem {
  final int id;
  String text;
  String date;

  NoteItem(this.id, this.text, this.date);
}

class NotesPage extends StatefulWidget {
  final List<NoteItem> notesList = List<NoteItem>();
  final List<String> startNotes = [
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore "
    "magna aliquyam erat, sed diam voluptua. \n\nAt vero eos et accusam et justo duo dolores et ea rebum. 😄😁",
    "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim "
    "placerat facer possim assum. \n\nLorem ipsum dolor sit amet, consectetuer adipiscing elit, "
    "sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."];

  NotesPage({Key key}) : super(key: key) {
    int i = 0;
    startNotes.forEach((note) {
      String date = formatDate(DateTime.now(), [dd, '/', mm, '/', yyyy, ' - ', HH, ':', nn]);
      notesList.add(NoteItem(DateTime.now().millisecondsSinceEpoch + i, note, date));
      i++;
    });
  }

  @override
  NotesPageState createState() => NotesPageState();
}

class NotesPageState extends State<NotesPage> {

  Future<Null> onDeleteClick(int id) async {
    return showDialog<Null>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Wirklich löschen?'),
          actions: <Widget>[
            FlatButton(
              child: Text('Abbrechen'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            FlatButton(
              child: Text('Löschen', style: TextStyle(color: Color(0xFFF53D3D))),
              onPressed: () {
                for (int i = 0; i < widget.notesList.length; i++) {
                  if (widget.notesList[i].id == id) {
                    widget.notesList.removeAt(i);
                    setState(() {});
                  }
                }
                Navigator.of(context).pop();
              },
            )
          ],
        );
      },
    );
  }

  void onNoteAdded(String note) {
    String date = formatDate(DateTime.now(), [dd, '/', mm, '/', yyyy, ' - ', HH, ':', nn]);
    widget.notesList.add(NoteItem(DateTime.now().millisecondsSinceEpoch, note, date));
  }

  void onNoteEdited(int id, String text) {
    String date = formatDate(DateTime.now(), [dd, '/', mm, '/', yyyy, ' - ', HH, ':', nn]);
    for (int i = 0; i < widget.notesList.length; i++) {
      if (widget.notesList[i].id == id) {
        widget.notesList[i].text = text;
        widget.notesList[i].date = date;
        setState(() {});
      }
    }
  }

  void onAddClick() {
    Navigator.push(context, NotesDetailsPageRoute("add", onNoteAdded));
  }

  void onEditClick(NoteItem note) {
    Navigator.push(context, NotesDetailsPageRoute("edit", onNoteEdited, note));
  }

  @override
  Widget build(BuildContext context) {
    if (widget.notesList.length > 0) {
      List<Widget> listArray = [];
      widget.notesList.forEach((item) {
        listArray.add(NotesCard(item, onDeleteClick, onEditClick));
      });
      return Scaffold(
          resizeToAvoidBottomPadding: false,
          body: ListView(
              padding: EdgeInsets.only(bottom: 75.0),
              children: listArray
          ),
          floatingActionButton: Builder(builder: (BuildContext context) {
            return FloatingActionButton(
              heroTag: null,
              onPressed: () {
                onAddClick();
              },
              child: Icon(Icons.add, color: Colors.white),
            );
          })
      );
    } else {
      return Scaffold(
          resizeToAvoidBottomPadding: false,
          body: Container(
              padding: EdgeInsets.only(top: 20.0),
              alignment: Alignment.topCenter,
              child: Text("Keine Notizen angelegt", style: TextStyle(color: Color(0xFF222222)))
          ),
          floatingActionButton: Builder(builder: (BuildContext context) {
            return FloatingActionButton(
              heroTag: null,
              onPressed: () {
                onAddClick();
              },
              child: Icon(Icons.add, color: Colors.white),
            );
          })
      );
    }
  }
}