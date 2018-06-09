import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class NotesScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Notizen',
  })

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Notes!</Text>
      </View>
    );
  }
}