import React, {PureComponent} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {Card, Button, Icon} from 'native-base';

const IMAGES = {
  "01d": require('../../assets/weather/01d.png'), "01n": require('../../assets/weather/01n.png'),
  "02d": require('../../assets/weather/02d.png'), "02n": require('../../assets/weather/02n.png'),
  "03d": require('../../assets/weather/03d.png'), "03n": require('../../assets/weather/03n.png'),
  "04d": require('../../assets/weather/04d.png'), "04n": require('../../assets/weather/04n.png'),
  "09d": require('../../assets/weather/09d.png'), "09n": require('../../assets/weather/09n.png'),
  "10d": require('../../assets/weather/10d.png'), "10n": require('../../assets/weather/10n.png'),
  "11d": require('../../assets/weather/11d.png'), "11n": require('../../assets/weather/11n.png'),
  "13d": require('../../assets/weather/13d.png'), "13n": require('../../assets/weather/13n.png'),
  "50d": require('../../assets/weather/50d.png'), "50n": require('../../assets/weather/50n.png'),
}

export default class NewsCard extends PureComponent {

  renderWeatherCardItems = () => {
    return this.props.city.list.slice(0, 6).map((item, index) => {
      return (
        <View key={index} style={styles.cardContentColumn}>
          <Text style={styles.cardContentText}>
            {item.dt_txt.split(" ")[1].split(":")[0]}:{item.dt_txt.split(" ")[1].split(":")[1]}
          </Text>
          <Image source={IMAGES[item.weather[0].icon]}/>
          <Text style={styles.cardContentText}>
            {Math.round(item.main.temp - 273.15)}°
          </Text>
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>{this.props.city.city.name}</Text>
            <Button transparent onPress={this.props.onPressItem}>
              <Icon name='md-trash' style={{color: "#222"}}/>
            </Button>
          </View>
          <View style={styles.divider}/>
          <View style={styles.cardContent}>
            {this.renderWeatherCardItems()}
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 0,
  },
  card: {
    marginBottom: 0,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardHeaderText: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 18,
    color: "#111"
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc'
  },
  cardContent: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardContentColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContentText: {
    color: "#111",
  },
  cardImage: {
    aspectRatio: 1.4,
    width: 100,
    alignSelf: "center"
  },
  cardText: {
    flex: 1,
    padding: 10,
    alignSelf: "center",
    color: '#111'
  }
});