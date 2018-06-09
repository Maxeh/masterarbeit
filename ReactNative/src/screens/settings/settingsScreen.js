import React, {Component} from 'react';
import {Container, Content, ListItem, CheckBox, Radio} from 'native-base';
import {Text, View} from 'react-native';

export default class SettingsScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Einstellungen',
    drawerLockMode: 'locked-closed',
  })

  constructor() {
    super();
    this.state = {
      checkboxReuters: true,
      checkboxSpiegel: false,
      checkboxFocus: false,
      checkboxHandelsblatt: false,
      radioOpenWeatherMap: true,
      radioWetterOnline: false,
      radioWetter24: false,
    }
  }

  setRadioButton = (type) => {
    switch (type) {
      case "radioOpenWeatherMap":
        if (!this.state.radioOpenWeatherMap) {
          this.setState({
            radioOpenWeatherMap: true,
            radioWetterOnline: false,
            radioWetter24: false,
          })
        }
        break;
      case "radioOpenWetterOnline":
        if (!this.state.radioWetterOnline) {
          this.setState({
            radioOpenWeatherMap: false,
            radioWetterOnline: true,
            radioWetter24: false,
          })
        }
        break;
      case "radioOpenWetter24":
        if (!this.state.radioWetter24) {
          this.setState({
            radioOpenWeatherMap: false,
            radioWetterOnline: false,
            radioWetter24: true,
          })
        }
        break;
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{borderBottomWidth: 1, borderBottomColor: "#ddd", padding: 15}}>
            <Text style={{fontSize: 22, color: "#000"}}>Nachrichten Quellen</Text>
          </View>

          <ListItem onPress={() => this.setState({checkboxReuters: !this.state.checkboxReuters})}>
            <CheckBox
              checked={this.state.checkboxReuters} color="#222"
              onPress={() => this.setState({checkboxReuters: !this.state.checkboxReuters})}
            />
            <View style={{marginLeft: 20}}>
              <Text style={{color: "#000"}}>Reuters</Text>
            </View>
          </ListItem>

          <ListItem onPress={() => this.setState({checkboxSpiegel: !this.state.checkboxSpiegel})}>
            <CheckBox
              checked={this.state.checkboxSpiegel} color="#222"
              onPress={() => this.setState({checkboxSpiegel: !this.state.checkboxSpiegel})}
            />
            <View style={{marginLeft: 20}}>
              <Text style={{color: "#000"}}>Spiegel Online</Text>
            </View>
          </ListItem>

          <ListItem onPress={() => this.setState({checkboxFocus: !this.state.checkboxFocus})}>
            <CheckBox
              checked={this.state.checkboxFocus} color="#222"
              onPress={() => this.setState({checkboxFocus: !this.state.checkboxFocus})}
            />
            <View style={{marginLeft: 20}}>
              <Text style={{color: "#000"}}>Focus Online</Text>
            </View>
          </ListItem>

          <View style={{borderBottomWidth: 1, borderColor: '#ddd'}}>
            <ListItem style={{borderBottomWidth: 0}}
                      onPress={() => this.setState({checkboxHandelsblatt: !this.state.checkboxHandelsblatt})}>
              <CheckBox
                checked={this.state.checkboxHandelsblatt} color="#222"
                onPress={() => this.setState({checkboxHandelsblatt: !this.state.checkboxHandelsblatt})}
              />
              <View style={{marginLeft: 20}}>
                <Text style={{color: "#000"}}>Handelsblatt</Text>
              </View>
            </ListItem>
          </View>

          <View style={{borderBottomWidth: 1, borderBottomColor: "#ddd", padding: 15}}>
            <Text style={{fontSize: 22, color: "#000"}}>Wetter Quellen</Text>
          </View>

          <ListItem
            style={{justifyContent: "space-between"}}
            onPress={() => this.setRadioButton("radioOpenWeatherMap")}
          >
            <Text style={{color: '#000'}}>OpenWeatherMap</Text>
            <Radio
              onPress={() => this.setRadioButton("radioOpenWeatherMap")}
              style={{marginRight: 10}} name="radioGroup" selectedColor='#222' selected={this.state.radioOpenWeatherMap}
            />
          </ListItem>

          <ListItem
            style={{justifyContent: "space-between"}}
            onPress={() => this.setRadioButton("radioOpenWetterOnline")}
          >
            <Text style={{color: '#000'}}>Wetter Online</Text>
            <Radio
              onPress={() => this.setRadioButton("radioOpenWetterOnline")}
              style={{marginRight: 10}} name="radioGroup" selectedColor='#222' selected={this.state.radioWetterOnline}
            />
          </ListItem>

          <ListItem
            style={{justifyContent: "space-between"}}
            onPress={() => this.setRadioButton("radioOpenWetter24")}
          >
            <Text style={{color: '#000'}}>Wetter24</Text>
            <Radio
              onPress={() => this.setRadioButton("radioOpenWetter24")}
              style={{marginRight: 10}} selectedColor='#222' selected={this.state.radioWetter24}
            />
          </ListItem>
        </Content>
      </Container>
    );
  }
}