import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';


@Component({
  templateUrl: 'news.html'
})
export class NewsPage {
  rootNavCtrl: NavController;
  news = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');

    /*this.http.get('http://maxeh.de/news.php', { responseType: 'text' }).subscribe(data => {
      let xml = this.parseXML(data);
      console.log(xml);
      let json:object = this.xmlToJson(xml);
      console.log(json);
      let image = json.rss.channel.item[0]["content:encoded"]["#cdata-section"];
      console.log(image.substring(image.indexOf("\""), image.indexOf("\"", image.indexOf("\"") + 1)));
    });*/

    this.http.get('http://maxeh.de/news.php').subscribe(data => {
      console.log(data);
    });
  }

  /* parseXML(xmlStr) {
     return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
   }*/

  // Changes XML to JSON
  xmlToJson(xml) {

    // Create the return object
    var obj = {};

    // console.log(xml.nodeType, xml.nodeName );

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    }
    else if (xml.nodeType == 4) { // cdata section
      obj = xml.nodeValue
    }

    // do children
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].length) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          if (typeof(obj[nodeName]) === 'object') {
            obj[nodeName].push(this.xmlToJson(item));
          }
        }
      }
    }
    return obj;
  };

  doRefresh(refresher) {
    console.log("refreshed");
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
