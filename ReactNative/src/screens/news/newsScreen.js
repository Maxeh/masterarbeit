import React, {Component} from 'react';
import {StyleSheet, FlatList, View, ActivityIndicator} from 'react-native';
import NewsCard from "./newsCard";

export default class NewsScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'News',
  })

  constructor() {
    super();
    this.state = {articles: []}
  }

  componentWillMount() {
    fetch('https://maxeh.de/masternews.php?type=news')
      .then((response) => response.json())
      .then((resJson) => this.setState({articles: resJson.articles}))
      .catch((err) => console.log(err));
  }

  renderItem = ({item}) => <NewsCard item={item} onPressItem={this.onPressItem}/>;

  onPressItem = (item) => this.props.navigation.navigate("newsDetailScreen", {item: item});

  keyExtractor = (item, index) => index.toString();

  renderContent = () => {
    if (this.state.articles.length > 0) {
      return (
        <View style={{flex: 1, backgroundColor: '#FEFEFE'}}>
          <FlatList
            data={this.state.articles}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            contentContainerStyle={{paddingBottom: 5, paddingTop: 1}}
          />
        </View>
      )
    } else return (
      <View style={{flex:1, backgroundColor:'#FEFEFE'}}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#222"/>
        </View>
      </View>
    )
  }

  render = () => this.renderContent();
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    justifyContent: 'center'
  }
});