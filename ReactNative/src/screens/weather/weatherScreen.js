import React, {Component} from 'react';
import {TextInput, Alert, StyleSheet, Text, View, FlatList} from 'react-native';
import {Button, Fab, Icon} from 'native-base';
import ActionButton from 'react-native-action-button';
import Dialog from "react-native-dialog";
import WeatherCard from "./weatherCard";

import { ConfirmDialog } from 'react-native-simple-dialogs';

export default class WeatherScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Wetter',
  })

  constructor() {
    super();
    this.state = {
      startCities: ["Bocholt", "Berlin"],
      cities: [],
      deleteDialogVisible: false,
      addDialogVisible: false,
      cityInput: "",
    }
  }

  componentWillMount() {
    this.state.startCities.forEach((city) => {
      this.cityAdd(city);
    })
  }

  cityAdd = (city) => {
    fetch('https://maxeh.de/masternews.php?type=weather&city=' + city)
      .then((response) => response.json())
      .then((resJson) => {
        if (resJson.cod === "200") {
          this.state.cities.push(resJson);
          this.setState({cities: this.state.cities})
        }
      })
      .catch((err) => console.log(err));
  }

  onPressItem = (id) => {
    this.setState({deleteDialogVisible: true})
  }

  onAddCityClick = () => {
    this.setState({addDialogVisible: true})
  }

  renderItem = ({item}) => <WeatherCard city={item} onPressItem={this.onPressItem}/>;

  keyExtractor = (item, index) => index.toString();

  renderContent = () => {
    if (this.state.cities.length > 0) {
      return (
        <View style={{flex:1}}>
          <FlatList
            data={this.state.cities}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            contentContainerStyle={{paddingBottom: 80}}
          />

          <ConfirmDialog
            titleStyle={{color: "#222"}}
            contentStyle={{padding:0}}
            title="Wirklich löschen?"
            visible={this.state.deleteDialogVisible}
            onTouchOutside={() => this.setState({deleteDialogVisible: false})}
            negativeButton={{
              title: "Abbrechen",
              titleStyle: {color: "#222"},
              onPress: () => alert("No touched!")
            }}
            positiveButton={{
              title: "Löschen",
              titleStyle: {color: "#f53d3d"},
              onPress: () => this.setState({deleteDialogVisible: false})
            }}>
          </ConfirmDialog>

          <ConfirmDialog
            titleStyle={{color: "#222", marginTop: 15, marginBottom: -25}}
            contentStyle={{padding:0}}
            title="Name der Stadt"
            visible={this.state.addDialogVisible}
            onTouchOutside={() => this.setState({addDialogVisible: false})}
            negativeButton={{
              title: "Abbrechen",
              titleStyle: {color: "#222"},
              onPress: () => alert("No touched!")
            }}
            positiveButton={{
              title: "Hinzufügen",
              titleStyle: {color: "#222"},
              onPress: () => {
                if (this.state.cityInput !== "") {
                  this.cityAdd(this.state.cityInput);
                  this.setState({cityInput: "", addDialogVisible: false})
                }
              }
            }}
            >
            <View style={{padding: 12, paddingLeft: 20}}>
              <TextInput onChangeText={(cityInput) => this.setState({cityInput})}
                         value={this.state.cityInput} autoFocus={true}/>
            </View>
          </ConfirmDialog>

          <ActionButton onPress={this.onAddCityClick} offsetX={15} offsetY={15} fixNativeFeedbackRadius={true} buttonColor="#222">
          </ActionButton>
        </View>
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