import 'package:flutter/material.dart';
import 'package:flutter_statusbarcolor/flutter_statusbarcolor.dart';
import 'news.dart';
import 'weather.dart';
import 'notes.dart';
import 'settings.dart';
import 'information.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  changeStatusColor(Color color) async {
    try {
      await FlutterStatusbarcolor.setStatusBarColor(color);
    }
    on Exception catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    changeStatusColor(Color(0xFF111111));

    return new MaterialApp(
      theme: new ThemeData(
        primaryColor: Color(0xFF222222),
        primaryColorDark: Color(0xFF222222),
        accentColor: Color(0xFF222222),
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  createState() => new MyHomePageState();
}

class MyHomePageState extends State<MyHomePage> with SingleTickerProviderStateMixin {
  static const IconData newsIcon = const IconData(0xe904, fontFamily: "icomoon");
  static const Color primaryColor =  Color(0xFF222222);

  final List<Tab> myTabs = <Tab>[
    new Tab(text: 'NEWS'),
    new Tab(text: 'WETTER'),
    new Tab(text: 'NOTIZEN'),
  ];
  NewsPage newsPage = NewsPage();
  WeatherPage weatherPage = WeatherPage();
  NotesPage notesPage = NotesPage();
  TabController tabController;
  int selectedTabIndex = 0;
  bool showFab = false;

  @override
  void initState() {
    super.initState();
    tabController = new TabController(vsync: this, length: myTabs.length);
    tabController.addListener(() {
      setState(() {
        selectedTabIndex = tabController.index;
        print(selectedTabIndex);
        selectedTabIndex > 0 ? showFab = true : showFab = false;
      });
    });
  }

  @override
  void dispose() {
    tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      primary: true,
      appBar: new AppBar(
        title: Text("MasterNews"),
        bottom: new TabBar(
          controller: tabController,
          tabs: myTabs,
        ),
      ),
      body: new TabBarView(
        controller: tabController,
        children: [
          newsPage,
          weatherPage,
          notesPage,
        ],
      ),
      drawer: Drawer(
        child: ListView(
          children: <Widget>[
            new Container(
              height: 60.0,
              padding: EdgeInsets.symmetric(horizontal: 20.0),
              alignment: Alignment.centerLeft,
              color: Color(0xFF222222),
              child: new Text('MasterNews', style: TextStyle(color: Color(0xFFFFFFFF), fontSize: 20.0))
            ),
            ListTile(
              leading: const Icon(newsIcon, color: primaryColor),
              title: Text("News"),
              onTap: () {
                tabController.animateTo(0);
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: const Icon(Icons.wb_sunny, color: primaryColor),
              title: Text("Wetter"),
              onTap: () {
                tabController.animateTo(1);
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: const Icon(Icons.create, color: primaryColor),
              title: Text("Notizen"),
              onTap: () {
                tabController.animateTo(2);
                Navigator.pop(context);
              },
            ),
            new Divider(),
            ListTile(
              leading: const Icon(Icons.settings, color: primaryColor),
              title: Text("Einstellungen"),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(context, SettingsPageRoute());
              },
            ),
            ListTile(
              leading: const Icon(Icons.info, color: primaryColor),
              title: Text("Informationen"),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(context, InformationPageRoute());
              },
            )
          ],
        ),
      ),
     /* floatingActionButton: new Builder(
        builder: (BuildContext context) {
          if (showFab) {
            return FloatingActionButton(
              onPressed: () {
                weatherPage.test();
                //NewsPage.of(context).test2();
                Scaffold
                    .of(context)
                    .showSnackBar(
                    new SnackBar(content: new Text('Show Snackbar')));
              },
              child: new Icon(Icons.add, color: Colors.white),
            );
          } else return new Container();
        }
      )*/
    );
  }
}

/*
class RandomWords extends StatefulWidget {
  @override
  createState() => new RandomWordsState();
}

class RandomWordsState extends State<RandomWords> {
  final _saved = new Set<WordPair>();
  final _suggestions = <WordPair>[];
  final _biggerFont = const TextStyle(fontSize: 18.0);

  Widget _buildSuggestions() {
    return new ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemBuilder: (context, i) {
          if (i.isOdd) return new Divider();
          final index = i ~/ 2;
          if (index >= _suggestions.length) {
            _suggestions.addAll(generateWordPairs().take(10));
          }
          return _buildRow(_suggestions[index]);
        });
  }

  Widget _buildRow(WordPair pair) {
    final alreadySaved = _saved.contains(pair);
    return new ListTile(
        title: new Text(
          pair.asPascalCase,
          style: _biggerFont,
        ),
        trailing: new Icon(
            alreadySaved ? Icons.favorite : Icons.favorite_border,
            color: alreadySaved ? Colors.red : null),
        onTap: () {
          setState(() {
            if (alreadySaved) {
              _saved.remove(pair);
            } else {
              _saved.add(pair);
            }
          });
        });
  }

  void _pushSaved() {
    Navigator.of(context).push(new MaterialPageRoute(builder: (context) {
      final tiles = _saved.map(
        (pair) {
          return new ListTile(
            title: new Text(
              pair.asPascalCase,
              style: _biggerFont,
            ),
          );
        },
      );
      final divided =
          ListTile.divideTiles(context: context, tiles: tiles).toList();

      return new Scaffold(
        appBar: new AppBar(
          title: new Text("Saved Suggestions"),
        ),
        body: new ListView(children: divided),
      );
    }));
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Startup Name Generator"),
        actions: <Widget>[
          new IconButton(icon: new Icon(Icons.list), onPressed: _pushSaved),
        ],
      ),
      body: _buildSuggestions(),
    );
  }
}*/
