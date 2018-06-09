import React, {Component} from 'react';
import {TouchableOpacity, StatusBar} from 'react-native';
import {StackNavigator, DrawerNavigator, TabNavigator} from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import SplashScreen from 'react-native-splash-screen'
import {Icon} from 'native-base';
import NewsScreen from './src/screens/news/newsScreen';
import WeatherScreen from './src/screens/weather/weatherScreen';
import NotesScreen from './src/screens/notes/notesScreen';
import NewsDetailScreen from "./src/screens/news/newsDetailScreen"
import NotesDetailScreen from "./src/screens/notes/notesDetailScreen"
import SettingsScreen from "./src/screens/settings/settingsScreen"
import InfoScreen from "./src/screens/info/infoScreen"
import CustomDrawer from "./src/screens/drawer"

// Tabs on main screen
const MainTabs = TabNavigator({
  newsScreen: {screen: NewsScreen},
  weatherScreen: {screen: WeatherScreen},
  notesScreen: {screen: NotesScreen},
}, {
  lazy: false,
  tabBarOptions: {
    activeTintColor: '#222',
    style: {
      backgroundColor: "#222",
      borderTopColor: 'transparent',
      borderTopWidth: 0,
      elevation: 0
    },
    labelStyle: {color: '#fff'},
    indicatorStyle: {backgroundColor: '#fff'},
  }
});

// NavigationOptions for mainTabs - cannot be defined inside of TabNavigator
const TabNavigationOptions = (props) => ({
  title: 'MasterNews',
  headerStyle: {backgroundColor: '#222', borderBottomColor: 'transparent', borderBottomWidth: 0, elevation: 0},
  headerLeft:
    <TouchableOpacity onPress={() => props.navigation.navigate('DrawerOpen')}>
      <Icon name="menu" style={{padding: 10, paddingLeft: 15, color: '#fff'}}/>
    </TouchableOpacity>
})

// StackNavigator which is inside the DrawerNavigator
const Stack = StackNavigator({
  mainTabs: {screen: MainTabs, navigationOptions: TabNavigationOptions},
  newsDetailScreen: {screen: NewsDetailScreen},
  notesDetailScreen: {screen: NotesDetailScreen},
  settingsScreen: {screen: SettingsScreen},
  infoScreen: {screen: InfoScreen}
}, {
  navigationOptions: {
    headerStyle: {backgroundColor: '#222'},
    headerTitleStyle: {color: 'white'},
    headerTintColor: 'white',
    headerBackTitle: null,
    drawerIcon: ({tintColor}) => (
      <Icon name="home"/>
    )
  },
  transitionConfig: getSlideFromRightTransition
})

// DrawerNavigator which is inside the root StackNavigator
const Drawer = DrawerNavigator({
  drawer: {screen: Stack},
}, {
  drawerWidth: 280,
  contentComponent: props => <CustomDrawer {...props} />
})

// First StackNavigator in the hierarchy
const RootNavigator = StackNavigator({
  drawer: {screen: Drawer},
}, {
  headerMode: 'none',
  transitionConfig: getSlideFromRightTransition
})

// App starts with this class
export default class Navigation extends Component {
  constructor() {
    super();
    SplashScreen.hide();
  }

  render() {
    return ([
      <StatusBar key='statusbar' backgroundColor="#111" barStyle="light-content"/>,
      <RootNavigator key='navigation'/>
    ])
  }
}


