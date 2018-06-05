import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class NewsDetailScreen extends Component {
  static navigationOptions = (props) => ({
    drawerLockMode: 'locked-closed',
    title: 'Reuters',
  })

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>News detai11111l!</Text>
      </View>
    );
  }
}