import React, {Component} from 'react';
import {TouchableOpacity, Platform, StatusBar, Text, View, ScrollView} from 'react-native';
import {Icon, Fab} from 'native-base';
import {StackNavigator, DrawerNavigator, TabNavigator, DrawerItems} from 'react-navigation';
import NewsScreen from './src/screens/newsScreen';
import WeatherScreen from './src/screens/weatherScreen';
import NotesScreen from './src/screens/notesScreen';
import NewsDetailScreen from "./src/screens/newsDetailScreen"
import NotesDetailScreen from "./src/screens/notesDetailScreen"
import SettingsScreen from "./src/screens/settingsScreen"

// Tabs on main screen
const MainTabs = TabNavigator({
  newsScreen: {screen: NewsScreen},
  weatherScreen: {screen: WeatherScreen},
  notesScreen: {screen: NotesScreen},
}, {
  tabBarOptions: {
    activeTintColor: '#222',
    style: {
      backgroundColor: "#222",
      borderTopColor: 'transparent',
      borderTopWidth: 0,
      elevation: 0
    },
    labelStyle: {color: Platform.select({ios: null, android: '#fff'})},
    indicatorStyle: {backgroundColor: '#fff'},
  }
});

// NavigationOptions for mainTabs - cannot be defined inside of TabNavigator
const TabNavigationOptions = (props) => ({
  title: 'MasterNews',
  headerStyle: {backgroundColor: '#222', borderBottomColor: 'transparent', borderBottomWidth: 0, elevation: 0},
  headerLeft: <DrawerOpenButton {...props} />
})

// DrawerOpenButton is exported, so that other screens can use it
export const DrawerOpenButton = (props) => (
  <TouchableOpacity onPress={() => props.navigation.navigate('DrawerOpen')}>
    <Icon name='menu' style={{padding: 10, paddingLeft: 15, color: "#fff"}}/>
  </TouchableOpacity>
)

// First StackNavigator which has the mainTabs as root
const Stack = StackNavigator({
  root: {screen: MainTabs, navigationOptions: TabNavigationOptions},
  newsDetails: {screen: NewsDetailScreen},
  notesDetails: {screen: NotesDetailScreen}
}, {
  navigationOptions: {
    headerStyle: {backgroundColor: '#222'},
    headerTitleStyle: {color: 'white'},
    headerTintColor: 'white',
    headerBackTitle: null,
    drawerIcon: ({tintColor}) => (
      <Icon name="home" />
    )
  }
})

// Second StackNavigator for settings
const Stack_Setting = StackNavigator({
  root: {screen: SettingsScreen}
}, {
  navigationOptions: {
    headerStyle: {backgroundColor: '#222'},
    headerTitleStyle: {color: 'white'},
    headerTintColor: 'white',
    headerBackTitle: null,
    drawerIcon: ({tintColor}) => (
      <Icon name="settings" />
    )
  }
})

// Create Drawer with custom design
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <View style={{justifyContent: 'center', height: 56, backgroundColor: '#222', marginBottom: -5}}>
      <Text style={{fontSize: 20, color: '#fff', marginLeft: 15}}>MasterNews</Text>
    </View>
    <View style={{flex: 1}} forceInset={{top: 'always', horizontal: 'never'}}>
      <DrawerItems activeTintColor="#222" {...props} />
    </View>
  </ScrollView>
);

// Create DrawerNavigator which has the StackNavigators that were created above as children
const Drawer = DrawerNavigator({
  main: {screen: Stack},
  setting: {screen: Stack_Setting}
}, {
  backBehavior: 'screen',
  contentComponent: CustomDrawerContentComponent
})

//Modal Stack (root)
const ModalStack = StackNavigator({
  // logout:{screen:LoginScreen},
  login: {screen: Drawer},
}, {
  headerMode: 'none',
})

export default class Navigation extends Component {
  constructor() {
    super()
    this.state = {
      fabShow: false,
    }
  }

  setFabShow = (fabShow) => {
    this.setState({fabShow})
  }

  render() {
    const screenProps = {
      fabShow: this.state.fabShow,
      setFabShow: (show) => this.setFabShow(show)
    }

    return ([
      <StatusBar key='statusbar' backgroundColor="#111" barStyle="light-content"/>,
      <ModalStack key='navigation' screenProps={screenProps}/>
    ])
  }
}