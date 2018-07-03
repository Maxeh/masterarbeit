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
      title: "MasterNews",
      theme: new ThemeData(
        primaryColor: Color(0xFF222222),
        primaryColorDark: Color(0xFF222222),
        accentColor: Color(0xFF222222),
        textSelectionColor: Color(0xFF222222),
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

  @override
  void initState() {
    super.initState();
    tabController = new TabController(vsync: this, length: myTabs.length);
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
    );
  }
}
