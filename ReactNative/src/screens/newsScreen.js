import React, {PureComponent} from 'react';
import {StyleSheet, FlatList, Image, Text, View, ActivityIndicator, TouchableWithoutFeedback} from 'react-native';
import {Container, Content, Card, CardItem} from 'native-base';


class NewsCard extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <View style={{marginLeft: 7, marginRight: 7, marginBottom: -5}}>

        <TouchableWithoutFeedback
          onPress={this._onPress}>
          <Card>
              <View style={{flex: 1, flexDirection: "row"}}>
                <Image style={{aspectRatio:1.4, width: 100, alignSelf:"center"}} source={{uri: this.props.urlToImage}} />
                <Text style={{flex: 1, padding: 10, alignSelf:"center", color:'#111'}}>
                  {this.props.title}
                </Text>
              </View>
          </Card>
        </TouchableWithoutFeedback>
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

  _onPressItem = (id) => {
    console.log(id);
  };

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item, index}) => (
    <NewsCard
      id={index}
      urlToImage={item.urlToImage}
      onPressItem={this._onPressItem}
      title={item.title}
    />
  );

  renderContent = () => {
    if (this.state.news.length > 0) {
      return (
        <FlatList
          data={this.state.news}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
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