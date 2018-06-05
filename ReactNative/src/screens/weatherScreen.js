import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class WeatherScreen extends Component {
  static navigationOptions = (props) => ({
    title:'Wetter',
  })

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Weather!</Text>
      </View>
    );
  }
}