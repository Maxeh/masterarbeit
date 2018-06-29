import 'package:flutter/material.dart';
import 'news-details.dart';

class NewsCard extends StatelessWidget {
  final snapshot;
  final index;

  NewsCard(this.snapshot, this.index);

  @override
  Widget build(BuildContext context) {
    return Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2.0)),
        child: Container(
            child: ListTile(
                onTap: () {
                  Navigator.push(
                      context, NewsDetailsPageRoute(snapshot.data[index]));
                },
                contentPadding: EdgeInsets.all(0.0),
                leading: SizedBox(
                    width: 100.0,
                    height: 70.0,
                    child: Container(
                        decoration: BoxDecoration(
                            image: DecorationImage(
                              fit: BoxFit.fill,
                              image: NetworkImage(
                                  snapshot.data[index].urlToImage),
                            )))),
                title: Container(
                  height: 60.0,
                  alignment: Alignment.centerLeft,
                  child: Text(snapshot.data[index].title,
                      style: TextStyle(fontSize: 14.0)),
                ))));
  }
}
