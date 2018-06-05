import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default class NewsScreen extends Component {
  static navigationOptions = (props) => ({
    title:'News',
  })

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>News!</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('newsDetails')}>
          <Text style={{marginHorizontal:15, color:'white'}}>Info</Text>
        </TouchableOpacity>
      </View>
    );
  }
}