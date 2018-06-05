import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {DrawerOpenButton} from "../../App"

export default class SettingsScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Reuters',
    headerLeft:<DrawerOpenButton {...props} />
  })

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }
}