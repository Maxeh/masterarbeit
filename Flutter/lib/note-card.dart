import 'package:flutter/material.dart';
import 'notes.dart';

class NoteCard extends StatelessWidget {
  final TextStyle textStyleCaption =
      TextStyle(fontSize: 16.0, color: Color(0xFF222222));
  final TextStyle textStyle = TextStyle(color: Color(0xFF222222), height: 1.2, fontSize: 15.0);
  final NoteItem noteItem;
  final onDeleteClick;

  NoteCard(this.noteItem, this.onDeleteClick);

  @override
  Widget build(BuildContext context) {
    return Card(
        child: Column(children: <Widget>[
      Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: <Widget>[
        Padding(
          padding: EdgeInsets.only(left: 15.0),
          child: Text(noteItem.date, style: textStyleCaption),
        ),
        Row(
          children: <Widget>[
            IconButton(
                onPressed: () {
                  // TODO: back to parent, then to detail page
                },
                icon: Icon(Icons.create, color: Color(0xFF222222))),
            IconButton(
                onPressed: () {
                  onDeleteClick(noteItem.id);
                },
                icon: Icon(Icons.delete, color: Color(0xFF222222)))
          ]
        )
      ]),
      Divider(height: 0.0),
      Container(
          alignment: Alignment.topLeft,
          padding: EdgeInsets.all(15.0),
          child: Text(noteItem.text, style: textStyle))
    ]));
  }
}
