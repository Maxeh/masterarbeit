import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Button, Fab, Icon} from 'native-base';
import WeatherCard from "./weatherCard";

export default class WeatherScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Wetter',
  })

  constructor() {
    super();
    this.state = {cities: []}
  }

  componentWillMount() {
    fetch('https://maxeh.de/masternews.php?type=weather&city=Bocholt')
      .then((response) => response.json())
      .then((resJson) => {
        this.state.cities.push(resJson);
        this.setState({cities: this.state.cities})
        console.log(this.state);
      })
      .catch((err) => console.log(err));
  }

  renderItem = ({item}) => <WeatherCard item={item}/>;

  keyExtractor = (item, index) => index.toString();

  renderContent = () => {
    if (this.state.cities.length > 0) {
      return (
        <FlatList
          data={this.state.cities}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          contentContainerStyle={{paddingBottom: 8}}
        />
      )
    } else return (
      <View>
        <Text>Noch keine Städte hinzugefügt</Text>
      </View>
    )
  }

  render = () => this.renderContent();
}

const styles = StyleSheet.create({
  fabStyle: {
    backgroundColor: '#222'
  }
});