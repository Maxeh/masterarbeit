import React, {PureComponent} from 'react';
import {StyleSheet, FlatList, Image, Text, View, ActivityIndicator, TouchableNativeFeedback} from 'react-native';
import {Card} from 'native-base';


class NewsCard extends PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    return (
      <View style={{marginLeft: 7, marginRight: 7, marginBottom: -5}}>
        <TouchableNativeFeedback onPress={this.onPress}>
          <Card>
            <View style={{flex: 1, flexDirection: "row"}}>
              <Image style={{aspectRatio: 1.4, width: 100, alignSelf: "center"}} source={{uri: this.props.item.urlToImage}}/>
              <Text style={{flex: 1, padding: 10, alignSelf: "center", color: '#111'}}>
                {this.props.item.title}
              </Text>
            </View>
          </Card>
        </TouchableNativeFeedback>
      </View>
    );
  }
}


export default class NewsScreen extends PureComponent {
  static navigationOptions = (props) => ({
    title: 'News',
  })

  constructor() {
    super();
    this.state = {
      news: []
    }
  }

  componentWillMount() {
    fetch('https://maxeh.de/masternews.php?type=news')
      .then((response) => response.json())
      .then((resJson) => {
        this.setState({news: resJson.articles});
        console.log(resJson);
      })
      .catch((err) => console.log(err));
  }

  onPressItem = (item) => {
    //change state news to articles
    //change so that whole article is passed
    console.log(item);
    this.props.navigation.navigate("NewsDetailScreen", {item:item});
  };

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => (
    <NewsCard item={item} onPressItem={this.onPressItem} />
  );

  renderContent = () => {
    if (this.state.news.length > 0) {
      return (
        <FlatList
          data={this.state.news}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          contentContainerStyle={{paddingBottom: 8}}
        />
      )
    } else return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#222"/>
      </View>
    )
  }

  render = () => this.renderContent();
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    justifyContent: 'center'
  }
});