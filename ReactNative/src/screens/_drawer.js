import React, {Component} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, Text, View, ScrollView} from 'react-native';
import {Icon} from 'native-base';

// Create Drawer with custom design
export default class CustomDrawer extends Component {

  constructor() {
    super();
    this.state = {
      activeScreen: "newsScreen",
      newsClicked: false,
      weatherClicked: false,
      notesClicked: false,
      settingsClicked: false,
      infoClicked: false,
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={{justifyContent: 'center', height: 70, backgroundColor: '#222'}}>
          <Text style={{fontSize: 20, color: '#fff', marginLeft: 15}}>MasterNews</Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableWithoutFeedback
            onPressIn={() => this.setState({newsClicked: true})}
            onPressOut={() => this.setState({newsClicked: false})}
            onPress={() => {
              // only navigate if route is not already active => new screen stack otherwise
              if (this.props.navigation.state.routes[0].routes[0].index !== 0) {
                this.props.navigation.navigate("newsScreen");
              } else {
                this.props.navigation.navigate("DrawerToggle"); // DrawerToggle works better than DrawerClose
              }
            }}
          >
            <View style={this.state.newsClicked ? {backgroundColor: '#DDD'} : null}>
              <View style={styles.buttonRow}>
                <View style={styles.buttonIcon}>
                  <Icon name='md-paper' style={{color: '#000', fontSize: 30}}/>
                </View>
                <Text style={styles.buttonText}>News</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPressIn={() => this.setState({weatherClicked: true})}
            onPressOut={() => this.setState({weatherClicked: false})}
            onPress={() => {
              // only navigate if route is not already active => new screen stack otherwise
              if (this.props.navigation.state.routes[0].routes[0].index !== 1) {
                this.props.navigation.navigate("weatherScreen");
              } else {
                this.props.navigation.navigate("DrawerToggle"); // DrawerToggle works better than DrawerClose
              }
            }}
          >
            <View style={this.state.weatherClicked ? {backgroundColor: '#DDD'} : null}>
              <View style={styles.buttonRow}>
                <View style={styles.buttonIcon}>
                  <Icon name='md-sunny' style={{color: '#000', fontSize: 30}}/>
                </View>
                <Text style={styles.buttonText}>Wetter</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPressIn={() => this.setState({notesClicked: true})}
            onPressOut={() => this.setState({notesClicked: false})}
            onPress={() => {
              // only navigate if route is not already active => new screen stack otherwise
              if (this.props.navigation.state.routes[0].routes[0].index !== 2) {
                this.props.navigation.navigate("notesScreen");
              } else {
                this.props.navigation.navigate("DrawerToggle"); // DrawerToggle works better than DrawerClose
              }
            }}
          >
            <View style={this.state.notesClicked ? {backgroundColor: '#DDD'} : null}>
              <View style={styles.buttonRow}>
                <View style={styles.buttonIcon}>
                  <Icon name='md-create' style={{color: '#000', fontSize: 30}}/>
                </View>
                <Text style={styles.buttonText}>Notizen</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.divider}/>

          <TouchableWithoutFeedback
            onPressIn={() => this.setState({settingsClicked: true})}
            onPressOut={() => this.setState({settingsClicked: false})}
            onPress={() => this.props.navigation.navigate("settings")}
          >
            <View style={this.state.settingsClicked ? {backgroundColor: '#DDD'} : null}>
              <View style={styles.buttonRow}>
                <View style={styles.buttonIcon}>
                  <Icon name='settings' style={{color: '#000', fontSize: 30}}/>
                </View>
                <Text style={styles.buttonText}>Einstellungen</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPressIn={() => this.setState({infoClicked: true})}
            onPressOut={() => this.setState({infoClicked: false})}
            onPress={() => this.props.navigation.navigate("info")}
          >
            <View style={this.state.infoClicked ? {backgroundColor: '#DDD'} : null}>
              <View style={styles.buttonRow}>
                <View style={styles.buttonIcon}>
                  <Icon name='information-circle' style={{color: '#000', fontSize: 30}}/>
                </View>
                <Text style={styles.buttonText}>Information</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    )
  }
}

const styles = {
  container: {
    backgroundColor: '#ccc',
    flexDirection: 'column',
    flex: 1,
  },
  topSection: {
    height: 80,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  icon: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#FFF',
    marginLeft: 10
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#FFF',
    marginLeft: 10
  },
  divider: {
    height: 1,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#ccc'
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginLeft: 15
  },
  buttonIcon: {
    width: 35
  },
  buttonText: {
    marginLeft: 15,
    fontSize: 15,
    color: '#000'
  }
};