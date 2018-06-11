import React, {Component} from 'react';
import {TextInput, Text, View, FlatList} from 'react-native';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import ActionButton from 'react-native-action-button';
import WeatherCard from "./weatherCard";

export default class WeatherScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Wetter',
  })

  constructor() {
    super();
    this.cityInputRef = null;
    this.state = {
      startCities: ["Bocholt"],
      cities: [],
      deleteCityId: null,
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

  onAddCityClick = () => {
    this.setState({addDialogVisible: true}, () => {
      setTimeout(() => {
        if (this.cityInputRef)
          this.cityInputRef.focus();
      }, 120)
    })
  }

  onCardDeleteCityClick = (id) => {
    this.setState({deleteCityId: id, deleteDialogVisible: true})
  }

  onDeleteCityClick = () => {
    if (this.state.deleteCityId) {
      this.state.cities = this.state.cities.filter((city) => city.city.id !== this.state.deleteCityId);
      this.setState({cities: this.state.cities, deleteCityId: null, deleteDialogVisible: false});
    }
  }

  renderItem = ({item}) => <WeatherCard city={item} onCardDeleteCityClick={this.onCardDeleteCityClick}/>;

  keyExtractor = (item, index) => index.toString();

  render = () => {
    return (
      <View style={{flex: 1}}>
        {this.state.cities.length > 0 &&
        (<FlatList
          data={this.state.cities}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          contentContainerStyle={{paddingBottom: 80}}
        />)}

        {this.state.cities.length === 0 &&
        (<Text>Noch keine Städte hinzugefügt</Text>)}

        <ConfirmDialog
          titleStyle={{color: "#222"}}
          contentStyle={{padding: 0}}
          title="Wirklich löschen?"
          visible={this.state.deleteDialogVisible}
          onTouchOutside={() => this.setState({deleteDialogVisible: false})}
          negativeButton={{
            title: "Abbrechen",
            titleStyle: {color: "#222"},
            onPress: () => this.setState({deleteDialogVisible: false})
          }}
          positiveButton={{
            title: "Löschen",
            titleStyle: {color: "#f53d3d"},
            onPress: () => this.onDeleteCityClick()
          }}>
        </ConfirmDialog>

        <ConfirmDialog
          titleStyle={{color: "#222", marginTop: 15, marginBottom: -25}}
          contentStyle={{padding: 0}}
          title="Name der Stadt"
          visible={this.state.addDialogVisible}
          onTouchOutside={() => this.setState({cityInput: "", addDialogVisible: false})}
          negativeButton={{
            title: "Abbrechen",
            titleStyle: {color: "#222"},
            onPress: () => this.setState({cityInput: "", addDialogVisible: false})
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
            <TextInput
              ref={(ref) => this.cityInputRef = ref}
              onChangeText={(cityInput) => this.setState({cityInput})}
              value={this.state.cityInput}
            />
          </View>
        </ConfirmDialog>

        <ActionButton
          onPress={this.onAddCityClick} offsetX={15} offsetY={15}
          fixNativeFeedbackRadius={true} buttonColor="#222"
        />
      </View>
    )
  }
}