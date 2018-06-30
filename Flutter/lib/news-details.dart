import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'news.dart';

class NewsDetailsPageRoute extends CupertinoPageRoute {
  NewsDetailsPageRoute(NewsArticle newsArticle)
      : super(builder: (BuildContext context) => new NewsDetailsPage(newsArticle));
}

class NewsDetailsPage extends StatefulWidget {
  final NewsArticle newsArticle;

  NewsDetailsPage(this.newsArticle, {Key key}) : super(key: key);

  @override
  NewsDetailsPageState createState() => new NewsDetailsPageState();
}

class NewsDetailsPageState extends State<NewsDetailsPage> {
  @override
  Widget build(BuildContext context) {
    return new WillPopScope(
        onWillPop: () async {
          return true;
        },
        child: Scaffold(
            appBar: AppBar(
              title: Text(widget.newsArticle.author),
            ),
            body:
            new ListView(
                children: <Widget>[
                  Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: <Widget>[
                        Image.network(widget.newsArticle.urlToImage),
                        Card(
                          margin: EdgeInsets.all(10.0),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(2.0)
                          ),
                          child: Container(
                            padding: EdgeInsets.all(10.0),
                            child: Text(widget.newsArticle.description,
                                style: TextStyle(color: Color(0xFF222222))
                            ),
                          ),
                        ),
                      ]
                  )
                ]
            )
        )
    );
  }
}
