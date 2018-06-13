import React, {Component} from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import {Content, Card} from 'native-base';

export default class NewsDetailScreen extends Component {
  static navigationOptions = (props) => ({
    drawerLockMode: 'locked-closed',
    title: props.navigation.state.params.item.source.name,
  })

  render() {
    return (
      <Content>
        <Image
          resizeMode={'cover'}
          style={styles.image}
          source={{uri: this.props.navigation.state.params.item.urlToImage}}
        />
        <Card style={styles.cardContent}>
          <Text style={styles.cardContentText}>
            {this.props.navigation.state.params.item.description}
          </Text>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 220
  },
  cardContent: {
    padding: 12,
    paddingLeft: 15,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
  },
  cardContentText: {
    color: "#222",
    lineHeight: 20,
  }
});