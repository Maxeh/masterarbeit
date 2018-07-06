import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import 'news-card.dart';

class NewsArticle {
  final String author;
  final String title;
  final String description;
  final String urlToImage;

  NewsArticle({this.author, this.title, this.description, this.urlToImage});

  factory NewsArticle.fromJson(Map<String, dynamic> json) {
    return NewsArticle(
      author: json['source']['name'],
      title: json['title'],
      description: json['description'],
      urlToImage: json['urlToImage'],
    );
  }
}

class NewsPage extends StatefulWidget {
  final List<NewsArticle> newsList = List<NewsArticle>();
  NewsPage({Key key}) : super(key: key);

  @override
  NewsPageState createState() => NewsPageState();
}

class NewsPageState extends State<NewsPage> {
  NewsPageState() { fetchNews(); }

  Future<void> fetchNews() async {
    if (widget.newsList.length == 0) {
      var response = await http.get('https://maxeh.de/masternews.php?type=news');
      if (response.statusCode == 200) {
        var decoded = json.decode(response.body);
        for (int i = 0; i < decoded['articles'].length; i++) {
          widget.newsList.add(NewsArticle.fromJson(decoded['articles'][i]));
        }
      }
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    if (widget.newsList.length > 0) {
      List<Widget> listArray = [];
      for (int i = 0; i < widget.newsList.length; i++) {
        listArray.add(NewsCard(widget.newsList[i]));
      }
      return ListView(children: listArray);
    } else return Container(
        alignment: Alignment.topCenter,
        padding: EdgeInsets.only(top: 20.0),
        child: SizedBox(
          width: 28.0,
          height: 28.0,
          child: CircularProgressIndicator(strokeWidth: 3.0)));
  }
}
