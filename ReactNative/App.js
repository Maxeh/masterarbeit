import React, {Component} from 'react';
import {TouchableOpacity, Platform, StatusBar, StyleSheet, Text, Button, Image, View, ScrollView} from 'react-native';
import {Icon} from 'native-base';
import {StackNavigator, DrawerNavigator, TabNavigator, createMaterialTopTabNavigator, createDrawerNavigator, createStackNavigator, SafeAreaView, DrawerItems} from 'react-navigation';
import NewsScreen from './src/screens/newsScreen';
import WeatherScreen from './src/screens/weatherScreen';
import NotesScreen from './src/screens/notesScreen';
import NewsDetailScreen from "./src/screens/newsDetailScreen"
import NotesDetailScreen from "./src/screens/notesDetailScreen"
import SettingsScreen from "./src/screens/settingsScreen"

//Tab
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
})

const TabNavigationOptions = (props) => ({
  title:'MasterNews',
  headerStyle:{backgroundColor:'#222', borderBottomColor: 'transparent', borderBottomWidth: 0, elevation: 0},
  headerLeft:<DrawerOpenButton {...props} />
})

export const DrawerOpenButton = (props) => (
  <TouchableOpacity onPress={() => props.navigation.navigate('DrawerOpen')}>
    <Icon name='menu' style={{padding:10, paddingLeft:15, color: "#fff"}}/>
  </TouchableOpacity>
)

const StackNavigationOptions = (props) => {
  console.log(props.navigation.state);
  props.navigation.state.routeName === "newsDetails" ? console.log("ok") : console.log("false");

  return ({
  headerStyle:{backgroundColor:'#222'},
  headerTitleStyle:{color:'white'},
  headerTintColor:'white',
  headerBackTitle:null,
  drawerIcon: ({ tintColor }) => (
    <Image
      source={require('./src/assets/icon.png')}
      style={[styles.icon, {tintColor: tintColor}]}
    />
  )});
}

//Stack
const Stack = StackNavigator({
  root:{screen:MainTabs, navigationOptions: TabNavigationOptions},
  newsDetails:{screen:NewsDetailScreen},
  notesDetails:{screen:NotesDetailScreen}
},{
  navigationOptions:StackNavigationOptions//, transitionConfig:getSlideFromRightTransition
})


const Stack_Setting = StackNavigator({
  root:{screen: SettingsScreen}
},{
  navigationOptions:StackNavigationOptions
})

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <View style={{justifyContent:'center', height:56, backgroundColor:'#222', marginBottom:-5}}>
      <Text style={{fontSize: 20, color:'#fff', marginLeft:15}}>MasterNews</Text>
    </View>
    <SafeAreaView style={{flex:1}} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems activeTintColor="#222" {...props} />
    </SafeAreaView>
  </ScrollView>
);

//Drawer
const Drawer = DrawerNavigator({
  main:{screen:Stack},
  setting:{screen:Stack_Setting}
},{
  backBehavior:'screen',
  contentComponent: CustomDrawerContentComponent
})

//Modal Stack (root)
const ModalStack = StackNavigator({
 // logout:{screen:LoginScreen},
  login:{screen:Drawer},
  //userprofile:{screen:UserProfileScreen}
},{
  mode:'modal',
  headerMode: 'none',
})

export default class Navigation extends Component{
  render(){
    return([
      <StatusBar key='statusbar' barStyle="light-content"/>,
      <ModalStack key='navigation'/>
    ])
  }
}



const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
