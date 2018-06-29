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
  NewsPage({Key key}) : super(key: key);
  final List<NewsArticle> newsList = List<NewsArticle>();

  @override
  NewsPageState createState() => NewsPageState();
}

class NewsPageState extends State<NewsPage> {

  Future<List<NewsArticle>> fetchPost() async {
    if (widget.newsList.length > 0) return widget.newsList;

    final response = await http.get('https://maxeh.de/masternews.php?type=news');
    if (response.statusCode == 200) {
      var decoded = json.decode(response.body);
      for (int i = 0; i < decoded['articles'].length; i++) {
        widget.newsList.add(NewsArticle.fromJson(decoded['articles'][i]));
      }
      return widget.newsList;
    } else {
      throw Exception('Failed to load post');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        alignment: Alignment.topCenter,
        child: FutureBuilder<List<NewsArticle>>(
            future: fetchPost(),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return ListView.builder(
                  itemBuilder: (BuildContext context, int index) =>
                      Container(
                          padding: EdgeInsets.fromLTRB(3.0, 0.0, 3.0, 0.0),
                          child: NewsCard(snapshot, index)),
                  itemCount: snapshot.data.length,
                );
              } else
                return Container(
                    alignment: Alignment.topCenter,
                    padding: EdgeInsets.only(top: 20.0),
                    child: SizedBox(
                        width: 28.0,
                        height: 28.0,
                        child: CircularProgressIndicator(strokeWidth: 3.0)));
            }));
  }
}
