import React, {PureComponent} from 'react';
import {StyleSheet, FlatList, View, ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import NewsCard from "./newsCard";

export default class NewsScreen extends PureComponent {
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
        <FlatList
          data={this.state.articles}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
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
    marginTop: 15,
    justifyContent: 'center'
  }
});